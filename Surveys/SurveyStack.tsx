import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Surveys} from '../Templates/Surveys';
import {SurveyQuestion} from './SurveyQuestion';
import AuthService from '../Services/auth.service';
import SurveySubmission from '../Models/SurveySubmission';

const {Navigator, Screen} = createStackNavigator();

const responses = {};

export const SurveyStack = ({navigation, route}) => {
  const addResponse = (response, index) => {
    responses[index] = response;
  };
  const submitSurvey = async () => {
    let surveyAnswers = Object.keys(responses).map((key) => {
      return responses[key];
    });
    await AuthService.submitSurvey(new SurveySubmission(surveyAnswers));
  };
  const surveyLength = Surveys[route.params.surveyType].length;
  return (
    <Navigator headerMode="none">
      {Surveys[route.params.surveyType].map((survey, index) => (
        <Screen
          name={`${index}`}
          component={SurveyQuestion}
          initialParams={{
            survey: survey,
            surveyType: route.params.surveyType,
            index: index,
            surveyLength: surveyLength,
            addResponse: addResponse,
            submitSurvey: submitSurvey,
          }}
          key={index}
        />
      ))}
    </Navigator>
  );
};
