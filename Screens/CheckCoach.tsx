/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Button,
  Toggle,
  Text,
} from '@ui-kitten/components';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const useToggleState = (initialState = false) => {
  const [checked, setChecked] = React.useState(initialState);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  return {checked, onChange: onCheckedChange};
};

const CheckCoach = ({navigation}) => {
  const primaryToggleState = useToggleState();

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <TopNavigation
          title="Back"
          alignment="start"
          accessoryLeft={BackAction}
        />
        <Layout
          style={{
            flex: 2,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
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
          <Layout style={{height: 90, width: '80%'}}>
            <Button
              //   onPress={navigateSignUpTwo}
              appearance="outline"
              size="large"
              status="primary">
              Next
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  toggle: {
    margin: 2,
  },
});

export default CheckCoach;
