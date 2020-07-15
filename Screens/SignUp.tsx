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
import {showMessage, hideMessage} from 'react-native-flash-message';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const showFields = () => {
  showMessage({
    message: 'Please complete all fields',
    type: 'danger',
  });

  setTimeout(() => {
    hideMessage();
  }, 3000);
};

export const SignUp = ({navigation}) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const navigateBack = () => {
    navigation.goBack();
  };
  const next = () => {
    if (firstName && lastName) {
      navigation.navigate('SignUpTwo', {
        firstName,
        lastName,
      });
    } else {
      showFields();
    }
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
              textContentType="name"
              size="large"
              value={firstName}
              label="First Name"
              placeholder="Steve"
              onChangeText={(nextValue) => setFirstName(nextValue)}
            />
          </Layout>
          <Layout style={{height: 90, width: '80%'}}>
            <Input
              textContentType="name"
              size="large"
              value={lastName}
              label="Last Name"
              placeholder="Fell"
              onChangeText={(nextValue) => setLastName(nextValue)}
            />
          </Layout>
          <Layout style={{height: 90, width: '80%'}}>
            <Button
              onPress={next}
              appearance="outline"
              size="giant"
              style={styles.buttonStyle}
              status="primary">
              💨 Next
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
