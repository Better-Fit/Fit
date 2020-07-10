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
    if (joinCode) {
      AuthService.joinTeam(joinCode).then(() => {
        navigation.navigate('Dashboard');
      });
    }
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
      {/* <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} /> */}
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <TopNavigation title="Entry Code" alignment="center" />
        <Layout
          style={{
            flex: 1,
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
              style={styles.buttonStyle}
              size="giant"
              status="primary"
              onPress={next}>
              Join 🏃‍♂️
            </Button>
          </Layout>
        </Layout>
      </SafeAreaView>
    </>
  );
};

export default JoinTeam;
