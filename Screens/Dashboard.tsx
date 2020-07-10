import * as React from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';
import {Layout, Button} from '@ui-kitten/components';
import AuthService from '../Services/auth.service';
import {getItemFromCache} from '../Utils/cache.util';

const Dashboard = ({navigation}) => {
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
    },
    surveyButton: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '75%',
      marginVertical: '2%',
    },
  });

  const [pre, setPre] = React.useState(false);
  const [post, setPost] = React.useState(false);
  const currentDay = new Date().getDate();

  React.useEffect(() => {
    getItemFromCache('pre').then((lastSurveyDay) => {
      if (lastSurveyDay === currentDay) {
        setPre(true);
      }
    });
    getItemFromCache('post').then((lastSurveyDay) => {
      if (lastSurveyDay === currentDay) {
        setPost(true);
      }
    });
  }, []);

  const noPreSurvey = (
    <Text style={styles.bannerText}>
      No pre training surveys at this time 🎉
    </Text>
  );

  const noPostSurvey = (
    <Text style={styles.bannerText}>
      No post training surveys at this time 🎉
    </Text>
  );

  const preSurvey = (
    <Button
      style={styles.surveyButton}
      appearance="outline"
      status="primary"
      onPress={() =>
        navigation.navigate('SurveyStack', {
          surveyType: 'pre',
        })
      }>
      Pre-Training Survey
    </Button>
  );

  const postSurvey = (
    <Button
      style={styles.surveyButton}
      appearance="outline"
      status="primary"
      onPress={() =>
        navigation.navigate('SurveyStack', {
          surveyType: 'post',
        })
      }>
      Post-Training Survey
    </Button>
  );

  const signOutButton = (
    <Button
      style={styles.surveyButton}
      appearance="outline"
      status="primary"
      onPress={() => AuthService.signOut()}>
      Sign Out
    </Button>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Layout style={styles.bannerView}>
        <Text style={styles.bannerText}>Your Surveys 📊</Text>
      </Layout>
      <Layout style={styles.container}>
        {pre ? noPreSurvey : preSurvey}
        {post ? noPostSurvey : postSurvey}
        {signOutButton}
      </Layout>
    </SafeAreaView>
  );
};

export default Dashboard;
