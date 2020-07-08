import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Surveys} from '../Templates/Surveys';
import {SurveyQuestion} from './SurveyQuestion';

const {Navigator, Screen} = createStackNavigator();

const responses = {};

export const SurveyStack = ({surveyType}) => {
  const addResponse = (response, index) => {
    responses[index] = response;
  };
  const submitSurvey = () => {
    for (const key in responses) {
      let surveyAnswers = [];
      surveyAnswers.push(responses[key]);
    }
  };
  const surveyLength = Surveys[surveyType].length;
  return (
    <Navigator headerMode="none">
      {Surveys[surveyType].map((survey, index) => (
        <Screen
          name={`${index}`}
          component={SurveyQuestion}
          initialParams={{
            survey: survey,
            surveyType: surveyType,
            index: index,
            surveyLength: surveyLength,
            addResponse: addResponse,
          }}
          key={index}
        />
      ))}
    </Navigator>
  );
};
