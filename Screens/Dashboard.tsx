import * as React from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';
import {
  Input,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Button,
} from '@ui-kitten/components';

const Dashboard = (props) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    bannerView: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '20%',
      width: '90%',
      borderWidth: 1,
      borderRadius: 8,
      borderColor: 'coral',
    },
    bannerText: {
      fontSize: 18,
      color: 'darkgrey',
    },
    historyView: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: '65%',
      width: '90%',
    },
    history: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '90%',
      width: '100%',
      borderWidth: 1,
      borderColor: '#55D6C2'
    },
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Layout style={styles.container}>
        <Layout style={styles.bannerView}>
          <Text style={styles.bannerText}>No More Quizzes to Display </Text>
        </Layout>
        <Layout style={styles.historyView}>
          <Layout style={styles.history}>
            <Text>History has come</Text>
          </Layout>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

export default Dashboard;
