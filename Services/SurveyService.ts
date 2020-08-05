import {Response} from '../Models/Response';
import functions from '@react-native-firebase/functions';

class SurveyService {
  static async sendResponse(response: Response) {

    console.log('RESPONSE', response);

    return functions()
      .httpsCallable('submitSurvey')(response)
      .then((value) => {
        console.log('🌈 Survey response cast [', value, ']');
      })
      .catch((error) => {
        console.log('🛑', error);
      });
  }
}

export default SurveyService;
