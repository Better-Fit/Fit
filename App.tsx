/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';

import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  Layout,
  Text,
  Input,
  Button,
} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

  const [joinCode, setJoinCode] = React.useState('');

  const [team, setTeam] = React.useState('');

  const [error, setError] = React.useState('');

  React.useEffect(() => {
    listenForAuth();
  }, []);

  const listenForAuth = () => {
    auth().onAuthStateChanged((userState) => {
      console.log(userState);
    });
  };

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout
        style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
        <Layout
          style={{
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'coral',
            height: 100,
          }}>
          <Text category="h1">Sign In</Text>
        </Layout>
        <Layout
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            height: 100,
            backgroundColor: 'purple',
          }}>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </Layout>

        <Layout
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            height: 100,
            backgroundColor: 'purple',
          }}>
          <Input
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </Layout>

        <Layout
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            height: 100,
            backgroundColor: 'purple',
          }}>
          <Button
            style={{width: '90%'}}
            onPress={() => {
              auth()
                .createUserWithEmailAndPassword(email, password)
                .then((resp) => {
                  console.log(resp);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}>
            Sign Up
          </Button>
        </Layout>

        <Layout
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            height: 100,
            backgroundColor: 'purple',
          }}>
          <Input
            placeholder="Team Name"
            value={team}
            onChangeText={(text) => setTeam(text)}
          />
        </Layout>

        <Layout
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            height: 100,
            backgroundColor: 'purple',
          }}>
          <Button
            style={{width: '90%'}}
            onPress={() => {
              functions()
                .httpsCallable('createTeam')({name: team})
                .then((res) => {
                  console.log(res);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}>
            Create Team
          </Button>
        </Layout>

        <Layout
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            height: 100,
            backgroundColor: 'purple',
          }}>
          <Input
            placeholder="Join Code"
            value={joinCode}
            onChangeText={(text) => setJoinCode(text)}
          />
        </Layout>

        <Layout
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            height: 100,
            backgroundColor: 'purple',
          }}>
          <Button
            style={{width: '90%'}}
            onPress={() => {
              functions()
                .httpsCallable('joinTeam')({joinCode: joinCode})
                .then((res) => {
                  console.log(res);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}>
            Join Team
          </Button>
        </Layout>
      </Layout>
    </ApplicationProvider>
  );
};

export default App;
