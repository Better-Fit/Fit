import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Landing} from './Screens/Landing';
import {SignInOne} from './Screens/SignInOne';
import {SignInTwo} from './Screens/SignInTwo';

const {Navigator, Screen} = createStackNavigator();

const AuthNavigator = () => (
  <Navigator headerMode="none">
    <Screen name="Landing" component={Landing} />
    <Screen name="SignInOne" component={SignInOne} />
    <Screen name="SignInTwo" component={SignInTwo} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <AuthNavigator />
  </NavigationContainer>
);
