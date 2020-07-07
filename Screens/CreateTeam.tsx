/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Input,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Button,
} from '@ui-kitten/components';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const CreateTeam = ({navigation}) => {
  const [name, setName] = React.useState('');
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
              //   onPress={navigateSignUpTwo}
              appearance="outline"
              size="large"
              status="primary">
              Create
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
