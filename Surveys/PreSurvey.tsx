import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Input,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Button,
} from '@ui-kitten/components';

// type of question (string / numeric / predetermined)
// will determine what to return for survey format
// possible responses to the question

export const Fatigue = ({navigation}) => {
  const [fatigue, setFatigue] = React.useState(5);
  
}