/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Layout, Text, Button} from '@ui-kitten/components';
import AuthService from '../Services/auth.service';
import Clipboard from '@react-native-community/clipboard';
import {showMessage, hideMessage} from 'react-native-flash-message';
import RNRestart from 'react-native-restart';

const CoachDashboard = ({navigation}) => {
  const [joinCode, setJoinCode] = React.useState('');
  const [teamName, setTeamName] = React.useState('');

  const loadTeam = async () => {
    AuthService.waitForAuth(async () => {
      let team = await AuthService.getTeam();

      setJoinCode(team.joinCode);
      setTeamName(team.name);
    });
  };

  const show = () => {
    showMessage({
      message: 'Join code copied to clipboard',
      type: 'success',
    });

    setTimeout(() => {
      hideMessage();
    }, 3000);
  };

  React.useEffect(() => {
    loadTeam();
  }, []);

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
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <Layout
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 30}}>{teamName}</Text>
      </Layout>
      <Layout
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: '10%',
        }}>
        <Text style={{fontSize: 25, textAlign: 'center'}}>
          Congrats 🎉{'\n'}your team is all set up
        </Text>
      </Layout>
      <Layout
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 90,
          width: '80%'
        }}>
        <Button
          onPress={() => {
            Clipboard.setString(joinCode);
            show();
          }}
          style={[styles.buttonStyle]}
          appearance="outline"
          status="primary"
          size="giant">
          Copy join code 📋
        </Button>
      </Layout>
      <Layout
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          onPress={() => {}}
          style={[styles.buttonStyle]}
          appearance="outline"
          status="primary"
          size="giant">
          Sign Out 👋
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

export default CoachDashboard;
