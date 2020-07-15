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
  Text,
  Toggle,
  Spinner,
} from '@ui-kitten/components';
import AuthService from '../Services/auth.service';
import {AuthNavigator} from '../Navigators/AuthNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {showMessage, hideMessage} from 'react-native-flash-message';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const LoadingIndicator = (props) => (
  <View style={{justifyContent: 'center', alignItems: 'center'}}>
    <Spinner size="small" />
  </View>
);

const show = () => {
  showMessage({
    message: 'That email address is already in use!',
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

const useToggleState = (initialState = false) => {
  const [checked, setChecked] = React.useState(initialState);
  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };
  return {checked, onChange: onCheckedChange};
};

export const SignUpTwo = ({navigation, route}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const primaryToggleState = useToggleState();

  const buttonContent = loading ? <LoadingIndicator /> : '💨 Next';

  const next = async () => {
    if (email && password) {
      setLoading(true);
      AuthService.signUp(
        email,
        password,
        route.params,
        primaryToggleState.checked,
      )
        .then(() => {
          if (primaryToggleState.checked) {
            navigation.navigate('CreateTeam');
          } else {
            navigation.navigate('JoinTeam');
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.code === 'auth/email-already-in-use') {
            show();
          }
          setLoading(false);
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
    toggle: {
      margin: 2,
    },
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
    indicator: {
      justifyContent: 'center',
      alignItems: 'center',
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
          <Layout
            style={{
              height: 75,
              width: '80%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Layout style={{justifyContent: 'center'}}>
              <Text category="h6">Are you a coach?</Text>
            </Layout>
            <Layout style={{justifyContent: 'center'}}>
              <Toggle
                style={styles.toggle}
                status="primary"
                {...primaryToggleState}
              />
            </Layout>
          </Layout>
          <Layout style={{height: 90, width: '80%'}}>
            <Button
              onPress={next}
              appearance="outline"
              size="giant"
              style={styles.buttonStyle}
              status="primary">
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
