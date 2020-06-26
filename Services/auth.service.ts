import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';

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
        this.update(nameData);
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
}

export default AuthService;
