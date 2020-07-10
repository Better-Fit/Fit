/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, Text, Button} from '@ui-kitten/components';
import AuthService from '../Services/auth.service';
import Clipboard from '@react-native-community/clipboard';

const CoachDashboard = ({navigation}) => {
  const [joinCode, setJoinCode] = React.useState('');

  const loadTeam = async () => {
    AuthService.waitForAuth(async () => {
      let team = await AuthService.getTeam();
      console.log(team.joinCode);
      setJoinCode(team.joinCode);
    });
  };

  React.useEffect(() => {
    loadTeam();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Layout
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Layout
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: '40%',
            width: '90%',
          }}>
          <Text style={{fontSize: 25, textAlign: 'center'}}>
            Congrats! 🎊 {'\n'} Your team is all set up
          </Text>
          <Layout
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              height: '40%',
              width: '90%',
            }}>
            <Layout
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                height: '50%',
                width: '90%',
              }}>
              <Text style={{fontSize: 20}}>Your Join Code is {joinCode}</Text>
            </Layout>
            <Layout
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                height: '50%',
                width: '90%',
              }}>
              <Button
                onPress={() => {
                  console.log('Ayyy: ', joinCode);
                  Clipboard.setString(joinCode);
                }}>
                Copy to Clipboard
              </Button>
            </Layout>
          </Layout>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

export default CoachDashboard;
