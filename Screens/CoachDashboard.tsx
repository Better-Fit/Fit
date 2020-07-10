/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';

const CoachDashboard = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Check Web App!</Text>
      </Layout>
    </SafeAreaView>
  );
};

export default CoachDashboard;
