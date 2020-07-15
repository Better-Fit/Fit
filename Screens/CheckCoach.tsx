/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Button,
  Toggle,
  Text,
} from '@ui-kitten/components';
import AuthService from '../Services/auth.service';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;



export const CheckCoach = ({navigation, useToggleState}) => {
  const primaryToggleState = useToggleState();

  const next = () => {
    AuthService.update({coach: primaryToggleState}).then(() =>
      navigation.navigate('JoinTeam'),
    );
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <Layout
      style={{
        height: 90,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Layout style={{justifyContent: 'center'}}>
        <Text category="h6">Are you a coach?</Text>
      </Layout>
      <Layout style={{justifyContent: 'center'}}>
        <Toggle
          style={styles.toggle}
          status="primary"
          {...primaryToggleState}
        />
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  toggle: {
    margin: 2,
  },
});

