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
  Text,
  Toggle,
} from '@ui-kitten/components';
import AuthService from '../Services/auth.service';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

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
  const primaryToggleState = useToggleState();

  const next = async () => {
    if (email && password) {
      AuthService.signUp(
        email,
        password,
        route.params,
        primaryToggleState.checked,
      )
        .then(() => {
          navigation.navigate('Loading');
        })
        .catch((error) => {
          console.log(error);
        });
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
              appearance="outline"
              size="large"
              status="primary"
              onPress={next}>
              Next
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
