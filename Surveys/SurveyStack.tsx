import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Surveys} from '../Templates/Surveys';
import {SurveyQuestion} from './SurveyQuestion';
import SurveyService from '../Services/SurveyService';
import SurveySubmission from '../Models/SurveySubmission';
import {Answer, Response} from '../Models/Response';

const {Navigator, Screen} = createStackNavigator();

var responses = {};

export const SurveyStack = ({navigation, route}) => {
  const addResponse = (response: Answer, index: number) => {
    responses[index] = response;
    console.log('😚', responses);
  };
  const submitSurvey = async (surveyType: string) => {
    let mappedResponses = Object.keys(responses).map((key) => responses[key]);
    console.log(surveyType);
    const response = new Response(mappedResponses as Answer[], surveyType);
    responses = {};
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
