import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Landing} from './Screens/Landing';
import {SignUp} from './Screens/SignUp';
import {SignUpTwo} from './Screens/SignUpTwo';
import JoinTeam from './Screens/JoinTeam';
import Dashboard from './Screens/Dashboard';
import CoachDashboard from './Screens/CoachDashboard';
import {SignIn} from './Screens/SignIn';
import CreateTeam from './Screens/CreateTeam';
import {SurveyStack} from './Surveys/SurveyStack';
import {Loading} from './Screens/Loading';

const {Navigator, Screen} = createStackNavigator();

const AuthNavigator = () => (
  <Navigator headerMode="none" initialRouteName="Loading">
    <Screen
      name="Loading"
      component={Loading}
      options={{gestureEnabled: false}}
    />
    <Screen
      name="Landing"
      component={Landing}
      options={{gestureEnabled: false}}
    />
    <Screen name="SignIn" component={SignIn} />
    <Screen name="SignUpOne" component={SignUp} />
    <Screen name="SignUpTwo" component={SignUpTwo} />
    <Screen
      name="JoinTeam"
      component={JoinTeam}
      options={{gestureEnabled: false}}
    />
    <Screen
      name="CreateTeam"
      component={CreateTeam}
      options={{gestureEnabled: false}}
    />
    <Screen
      name="Dashboard"
      component={Dashboard}
      options={{gestureEnabled: false}}
    />
    <Screen
      name="CoachDashboard"
      component={CoachDashboard}
      options={{gestureEnabled: false}}
    />
    <Screen name="SurveyStack" component={SurveyStack} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <AuthNavigator />
  </NavigationContainer>
);
