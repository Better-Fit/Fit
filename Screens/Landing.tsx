/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

const SignInIcon = (props) => <Icon {...props} name="log-in-outline" />;

export const Landing = ({navigation}) => {
  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  const navigateSignUpOne = () => {
    navigation.navigate('SignUpOne');
  };

  const navigateSignIn = () => {
    navigation.navigate('SignIn');
  }

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <TopNavigation alignment="center" />
        <Layout
          style={{
            flex: 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Layout style={{width: '50%', height: 60}}>
            <Button accessoryRight={SignInIcon} onPress={navigateSignIn}>SIGN IN</Button>
          </Layout>
          <Layout style={{width: '50%', height: 60}}>
            <Button onPress={navigateSignUpOne}>JOIN YOUR TEAM</Button>
          </Layout>
        </Layout>
      </SafeAreaView>
    </>
  );
};
