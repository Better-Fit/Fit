/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {
  Button,
  Icon,
  Layout,
  TopNavigation,
  Text,
  Spinner,
} from '@ui-kitten/components';

export const Landing = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);

  const navigateSignUpOne = () => {
    navigation.navigate('SignUpOne');
  };

  const navigateSignIn = () => {
    setLoading(true);
    navigation.navigate('SignIn');
  };

  const LoadingIndicator = (props) => (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Spinner size="small" />
    </View>
  );

  const buttonContent = loading ? <LoadingIndicator /> : 'Sign In 📲';

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
        <TopNavigation alignment="center" />
        <Layout
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Layout style={{height: 100}}>
            <Text style={{fontSize: 50}}>🛠</Text>
          </Layout>
          <Layout style={{width: '75%', height: 90}}>
            <Button
              size="giant"
              appearance="outline"
              style={styles.buttonStyle}
              onPress={navigateSignIn}>
              {buttonContent}
            </Button>
          </Layout>
          <Layout style={{width: '75%', height: 90}}>
            <Button
              size="giant"
              appearance="outline"
              style={styles.buttonStyle}
              onPress={navigateSignUpOne}>
              🥳 Sign Up
            </Button>
          </Layout>
        </Layout>
      </SafeAreaView>
    </>
  );
};
