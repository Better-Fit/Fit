/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {
  Input,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Button,
  Spinner,
} from '@ui-kitten/components';
import AuthService from '../Services/auth.service';
import {AppContext} from '../Contexts/app.context';
import RNRestart from 'react-native-restart';
import {showMessage, hideMessage} from 'react-native-flash-message';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const SignIn = ({navigation}) => {
  const {appInfo, dispatchApp} = React.useContext(AppContext);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const show = () => {
    showMessage({
      message: 'That email address is invalid!',
      type: 'danger',
    });

    setTimeout(() => {
      hideMessage();
    }, 3000);
  };

  const showFields = () => {
    showMessage({
      message: 'Please complete all fields',
      type: 'danger',
    });

    setTimeout(() => {
      hideMessage();
    }, 3000);
  };

  const LoadingIndicator = (props) => (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Spinner size="small" />
    </View>
  );

  const buttonContent = loading ? <LoadingIndicator /> : 'Sign In 📲';

  const next = () => {
    console.log('🙄', email + ' ' + password);
    if (email && password) {
      setLoading(true);
      AuthService.signIn(email, password)
        .then(() => {
          AuthService.getUser().then((user) => {
            dispatchApp({
              type: 'UPDATE_USER',
              user: user,
              loading: false,
            });

            RNRestart.Restart();
          });
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          if (error.code === 'auth/invalid-email') {
            show();
          }
        });
    } else {
      showFields();
    }
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
              {buttonContent}
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
