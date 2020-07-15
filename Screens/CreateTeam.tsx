/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {
  Input,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Button,
  Spinner,
} from '@ui-kitten/components';
import AuthService from '../Services/auth.service';
import RNRestart from 'react-native-restart';

const LoadingIndicator = (props) => (
  <View style={{justifyContent: 'center', alignItems: 'center'}}>
    <Spinner size="small" />
  </View>
);

const CreateTeam = ({navigation}) => {
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const buttonContent = loading ? <LoadingIndicator /> : 'Create 🛠';

  const next = () => {
    setLoading(true);
    AuthService.createTeam(name).then(() =>
      navigation.navigate('CoachDashboard'),
    );
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
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <TopNavigation title="Create Team" alignment="center" />
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
              value={name}
              label="Team Name"
              placeholder="Steve"
              onChangeText={(nextValue) => setName(nextValue)}
            />
          </Layout>
          <Layout style={{height: 90, width: '80%'}}>
            <Button
              onPress={next}
              appearance="outline"
              style={styles.buttonStyle}
              size="giant"
              status="primary">
              {buttonContent}
            </Button>
          </Layout>
          <Layout style={{height: 90, width: '80%'}}>
            <Button
              onPress={() => {
                AuthService.signOut();
              }}
              appearance="outline"
              style={styles.buttonStyle}
              size="giant"
              status="primary">
              Sign Out 👋
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

export default CreateTeam;
