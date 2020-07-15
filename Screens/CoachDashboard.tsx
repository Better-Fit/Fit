/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Layout, Text, Button} from '@ui-kitten/components';
import AuthService from '../Services/auth.service';
import Clipboard from '@react-native-community/clipboard';
import {showMessage, hideMessage} from 'react-native-flash-message';

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
    safeArea: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonLayout: {
      height: 100,
      width: '80%',
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
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={{height: 50, width: '80%'}}>
        <Text style={{fontSize: 25, textAlign: 'center'}}>{teamName}</Text>
      </Layout>
      <Layout style={styles.buttonLayout}>
        <Text style={{fontSize: 25, textAlign: 'center'}}>
          Congrats 🎉{'\n'}your team is all set up
        </Text>
      </Layout>
      <Layout style={styles.buttonLayout}>
        <Button
          onPress={() => {
            Clipboard.setString(joinCode);
            show();
          }}
          appearance="outline"
          size="giant"
          status="primary"
          style={styles.buttonStyle}>
          Copy join code 📋
        </Button>
      </Layout>
      <Layout style={styles.buttonLayout}>
        <Button
          onPress={() => AuthService.signOut()}
          appearance="outline"
          size="giant"
          status="primary"
          style={styles.buttonStyle}>
          Sign Out 👋
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

export default CoachDashboard;
