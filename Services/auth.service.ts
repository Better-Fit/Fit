import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import SurveySubmission from '../Models/SurveySubmission';
import Team from '../Models/Team';
import {storeItemInCache} from '../Utils/cache.util';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';

// functions().useFunctionsEmulator('http://localhost:3000');

class AuthService {
  static authInstance = auth();

  static async signUp(email, password, formData, isCoach) {
    if (AuthService.authInstance.currentUser) {
      AuthService.authInstance.signOut();
    }
    return AuthService.authInstance
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        formData.coach = isCoach;
        if (resp.user.uid) {
          storeItemInCache('uid', resp.user.uid);
        }
        return AuthService.update(formData);
      });
  }

  static async signIn(email: string, password: string) {
    return AuthService.authInstance
      .signInWithEmailAndPassword(email, password)
      .then(async (user) => {
        if (user.user.uid) {
          await storeItemInCache('uid', user.user.uid);
        }
      });
  }

  static async update(data) {
    return functions()
      .httpsCallable('updateUser')(data)
      .catch((error) => {
        console.log(error);
      });
  }

  static async getUser() {
    return functions()
      .httpsCallable('getUser')()
      .catch((error) => {
        console.log('🛑', error);
      });
  }

  static async joinTeam(joinCode: string) {
    return functions()
      .httpsCallable('joinTeam')({joinCode: joinCode})
      .then((res) => {
        console.log('🌈', res);
      });
      // .catch((error) => {
      //   console.log('🛑', error);
      // });
  }

  static async createTeam(name: string) {
    return functions()
      .httpsCallable('createTeam')({name: name})
      .catch((error) => {
        console.log('🛑', error);
      });
  }

  static async submitSurvey(submission: SurveySubmission) {
    return functions()
      .httpsCallable('submitSurvey')(submission)
      .then((value) => {
        console.log('🌈', value);
      })
      .catch((error) => {
        console.log('🛑', error);
      });
  }

  static async signOut() {
    return AuthService.authInstance.signOut().then(() => {
      AsyncStorage.clear().then(() => {
        RNRestart.Restart();
      });
    });
  }

  static async waitForAuth(authenticated: () => void) {
    AuthService.authInstance.onAuthStateChanged((user) => {
      if (user != null) {
        authenticated();
      }
    });
  }

  static async getTeam() {
    return functions()
      .httpsCallable('getTeam')()
      .then((res) => res.data as Team);
  }
}

export default AuthService;
