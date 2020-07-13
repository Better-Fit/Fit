/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Input,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Button,
} from '@ui-kitten/components';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const SignIn = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const next = () => {
    navigation.navigate('Dashboard');
  };

  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

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
        <TopNavigation
          title="Back"
          alignment="start"
          accessoryLeft={BackAction}
        />
        <Layout
          style={{
            flex: 2,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Layout style={{height: 90, width: '80%'}}>
            <Input
              textContentType="emailAddress"
              size="large"
              value={email}
              label="Email"
              placeholder="stevefell@gmail.com"
              onChangeText={(nextValue) => setEmail(nextValue)}
            />
          </Layout>
          <Layout style={{height: 90, width: '80%'}}>
            <Input
              secureTextEntry
              textContentType="password"
              size="large"
              value={password}
              label="Password"
              placeholder="ArcticMonkeys69"
              onChangeText={(nextValue) => setPassword(nextValue)}
            />
          </Layout>
          <Layout style={{height: 90, width: '80%'}}>
            <Button
              appearance="outline"
              style={styles.buttonStyle}
              size="giant"
              status="primary"
              onPress={next}>
              Sign In 👉
            </Button>
          </Layout>
        </Layout>
        <Layout
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </SafeAreaView>
    </>
  );
};
