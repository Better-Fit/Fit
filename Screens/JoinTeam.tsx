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

const JoinTeam = ({navigation}) => {
  const [joinCode, setJoinCode] = React.useState('');

  const navigateToDashboard = () => {
      navigation.navigate('Dashboard');
  }

  const checkJoinCode = (joincode) => {
      // check join code func
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'lightblue',
    },
    labelView: {
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  });

  const next = () => {
      navigation.navigate('Dashboard');
  }

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
