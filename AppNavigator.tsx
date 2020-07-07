import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Landing} from './Screens/Landing';
import {SignUp} from './Screens/SignUp';
import {SignUpTwo} from './Screens/SignUpTwo';
import JoinTeam from './Screens/JoinTeam';
import Dashboard from './Screens/Dashboard';
import {SignIn} from './Screens/SignIn';
import CreateTeam from './Screens/CreateTeam';
import CheckCoach from './Screens/CheckCoach';

const {Navigator, Screen} = createStackNavigator();

const AuthNavigator = () => (
  <Navigator headerMode="none" initialRouteName="CreateTeam">
    <Screen name="Landing" component={Landing} />
    <Screen name="SignIn" component={SignIn} />
    <Screen name="SignUpOne" component={SignUp} />
    <Screen name="SignUpTwo" component={SignUpTwo} />
    <Screen name="CheckCoach" component={CheckCoach} />
    <Screen
      name="JoinTeam"
      component={JoinTeam}
      options={{gestureEnabled: false}}
    />
    <Screen name="CreateTeam" component={CreateTeam} />
    <Screen
      name="Dashboard"
      component={Dashboard}
      options={{gestureEnabled: false}}
    />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <AuthNavigator />
  </NavigationContainer>
);
