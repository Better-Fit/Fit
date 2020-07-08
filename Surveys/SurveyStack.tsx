import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Surveys} from '../Templates/Surveys';
import {SurveyQuestion} from './SurveyQuestion';

const {Navigator, Screen} = createStackNavigator();

const responses = [];

export const SurveyStack = ({surveyType}) => {
  const addResponse = (response) => {
    responses.push(response);
    console.log('RESPONSE ARRAY', responses);
  };
  return (
    <Navigator>
      {Surveys[surveyType].map((survey, index) => (
        <Screen
          name={`${index}`}
          component={SurveyQuestion}
          initialParams={{
            survey: survey,
            surveyType: surveyType,
            index: index,
            addResponse: addResponse,
          }}
        />
      ))}
    </Navigator>
  );
};
