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

declare const global: {HermesInternal: null | {}};

const App = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

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
          <Text category="h1">Sign Up</Text>
        </Layout>
        <Layout
          style={{
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',
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
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: 100,
            backgroundColor: 'yellow',
          }}>
          <Input
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </Layout>

        <Layout
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: 100,
            backgroundColor: 'yellow',
          }}>
          <Button
            onPress={() => {
              auth()
                .createUserWithEmailAndPassword(email, password)
                .catch(setError);
            }}>
            Sign Up
          </Button>
        </Layout>

        <Layout
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: 100,
            backgroundColor: 'yellow',
          }}>
          <Text category="h3">{error.code}</Text>
        </Layout>
      </Layout>
    </ApplicationProvider>
  );
};

export default App;
