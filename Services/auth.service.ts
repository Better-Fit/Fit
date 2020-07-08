import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import SurveyAnswer from '../Models/SurveyAnswer';
import SurveySubmission from '../Models/SurveySubmission';

// functions().useFunctionsEmulator('http://localhost:3000');

class AuthService {
  static authInstance = auth();

  static async signUp(email, password, nameData) {
    if (this.authInstance.currentUser) {
      this.authInstance.signOut();
    }
    this.authInstance
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        console.log(resp);
        AuthService.update(nameData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static async update(data) {
    functions()
      .httpsCallable('updateUser')(data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static async joinTeam(joinCode: string) {
    return functions()
      .httpsCallable('joinTeam')({joinCode: joinCode})
      .then((res) => {
        console.log('🌈', res);
      })
      .catch((error) => {
        console.log('🛑', error);
      });
  }

  static async submitSurvey() {

    let answer1 = new SurveyAnswer(
      'How well did you sleep last night?',
      'string',
      'I slept very well last night',
    );

    let answer2 = new SurveyAnswer(
      'How exerted do you feel?',
      'string',
      'I do not feel exerted at all',
    );

    let answer3 = new SurveyAnswer(
      'From 1 to 10 how fatigued are you?',
      'int',
      3,
    );

    let submission = new SurveySubmission([answer1, answer2, answer3]);

    return functions()
      .httpsCallable('submitSurvey')(submission)
      .then((value) => {
        console.log('🌈', value);
      })
      .catch((error) => {
        console.log('🛑', error);
      });
  }
}

export default AuthService;
