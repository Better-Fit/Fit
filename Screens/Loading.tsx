/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, Spinner} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import AuthService from '../Services/auth.service';

export const Loading = ({navigation}) => {
  const [initializing, setInitializing] = React.useState(true);
  const [AuthenticatedUser, setAuthenticatedUser] = React.useState();

  const onAuthStateChanged = (user) => {
    // AuthService.signOut();
    setAuthenticatedUser(user);
    console.log(initializing);
    if (initializing) {
      setInitializing(false);
    }
  };

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }

  if (!AuthenticatedUser) {
    navigation.navigate('Landing');
  } else {
    AuthService.getUser().then((user) => {
      console.log('AUTHENTICATED USER', user);
      if (!user.data.coach) {
        if (!user.data.teamId) {
          navigation.navigate('JoinTeam');
        } else {
          navigation.navigate('Dashboard');
        }
      } else {
        if (!user.data.teamId) {
          navigation.navigate('CreateTeam');
        } else {
          navigation.navigate('CoachDashboard');
        }
      }
    });
  }

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <Layout
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Spinner status="primary" size="giant" />
        </Layout>
      </SafeAreaView>
    </>
  );
};
