import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Surveys} from '../Templates/Surveys';
import {SurveyQuestion} from './SurveyQuestion';
import SurveyService from '../Services/SurveyService';
import SurveySubmission from '../Models/SurveySubmission';
import {Answer, Response} from '../Models/Response';

const {Navigator, Screen} = createStackNavigator();

export const SurveyStack = ({navigation, route}) => {
  let responses = {};
  const addResponse = (response: Answer, index: number) => {
    responses[index] = response;
  };
  const submitSurvey = async (surveyType: string) => {
    const response = new Response(responses);
    console.log(response);
    return SurveyService.sendResponse(response);
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
