/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Button, Icon, Layout, TopNavigation, Text} from '@ui-kitten/components';
import theme from 'Styles/theme';

const SignInIcon = (props) => <Icon {...props} name="log-in-outline" />;

export const Landing = ({navigation}) => {
  const navigateSignUpOne = () => {
    navigation.navigate('SignUpOne');
  };

  const navigateSignIn = () => {
    navigation.navigate('SignIn');
  };

  const styles = StyleSheet.create({
    buttonStyle: {
      backgroundColor: 'white',
      borderWidth: 0,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
  });

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <TopNavigation alignment="center" />
        <Layout
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Layout style={{height: 100}}>
            <Text style={{fontSize: 50}}>🛠</Text>
          </Layout>
          <Layout style={{width: '75%', height: 90}}>
            <Button
              size="giant"
              appearance="outline"
              style={styles.buttonStyle}
              onPress={navigateSignIn}>
              Sign In 📲
            </Button>
          </Layout>
          <Layout style={{width: '75%', height: 90}}>
            <Button
              size="giant"
              appearance="outline"
              style={styles.buttonStyle}
              onPress={navigateSignUpOne}>
              🥳 Sign Up
            </Button>
          </Layout>
        </Layout>
      </SafeAreaView>
    </>
  );
};
