/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';
import {
  Input,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Button,
} from '@ui-kitten/components';
import AuthService from '../Services/auth.service';

const JoinTeam = ({navigation, route}) => {
  const [joinCode, setJoinCode] = React.useState('');

  const next = () => {
    AuthService.joinTeam(joinCode).then((val) => {
      AuthService.submitSurvey();
    });
    navigation.navigate('Dashboard');
  };

  return (
    <>
      {/* <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} /> */}
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <TopNavigation title="Entry Code" alignment="center" />
        <Layout
          style={{
            flex: 2,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Layout style={{height: 90, width: '80%'}}>
            <Input
              keyboardType="numeric"
              size="large"
              value={joinCode}
              label="Join Code"
              placeholder="43201"
              onChangeText={(nextValue) => setJoinCode(nextValue)}
            />
          </Layout>
          <Layout style={{height: 90, width: '80%'}}>
            <Button
              appearance="outline"
              size="large"
              status="primary"
              onPress={next}>
              Finish
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

export default JoinTeam;
