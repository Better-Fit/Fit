/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {
  Input,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Button,
  Text,
  Spinner,
} from '@ui-kitten/components';
import AuthService from '../Services/auth.service';
import RNRestart from 'react-native-restart';

const LoadingIndicator = (props) => (
  <View style={{justifyContent: 'center', alignItems: 'center'}}>
    <Spinner size="small" />
  </View>
);

const JoinTeam = ({navigation, route}) => {
  const [joinCode, setJoinCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const buttonContent = loading ? <LoadingIndicator /> : 'Join 🏃‍♂️';

  const next = () => {
    if (joinCode) {
      setLoading(true);
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
              {buttonContent}
            </Button>
          </Layout>
          <Layout style={{height: 90, width: '80%'}}>
            <Button
              appearance="outline"
              style={styles.buttonStyle}
              size="giant"
              status="primary"
              onPress={() => {
                AuthService.signOut();
                RNRestart.Restart();
              }}>
              Sign Out 👋
            </Button>
          </Layout>
        </Layout>
      </SafeAreaView>
    </>
  );
};

export default JoinTeam;
