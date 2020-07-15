import * as React from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';
import {Layout, Button} from '@ui-kitten/components';
import AuthService from '../Services/auth.service';
import {getItemFromCache} from '../Utils/cache.util';
import {useFocusEffect} from '@react-navigation/native';

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
    },
    bannerText: {
      fontSize: 18,
      color: 'darkgrey',
      paddingVertical: '5%',
    },
    surveyButton: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '75%',
    },
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

  const [pre, setPre] = React.useState(false);
  const [post, setPost] = React.useState(false);
  const currentDay = new Date().getDate();

  React.useEffect(() => {
    checkSurveys();
  });

  const checkSurveys = () => {
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
  };

  useFocusEffect(
    React.useCallback(() => {
      checkSurveys();
    }, []),
  );

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
      style={styles.buttonStyle}
      size="giant"
      appearance="outline"
      status="primary"
      onPress={() =>
        navigation.navigate('SurveyStack', {
          surveyType: 'pre',
        })
      }>
      Pre-Training Survey 📝
    </Button>
  );

  const postSurvey = (
    <Button
      style={styles.buttonStyle}
      size="giant"
      appearance="outline"
      status="primary"
      onPress={() =>
        navigation.navigate('SurveyStack', {
          surveyType: 'post',
        })
      }>
      Post-Training Survey 📝
    </Button>
  );

  const signOutButton = (
    <Button
      style={styles.buttonStyle}
      size="giant"
      appearance="outline"
      status="primary"
      onPress={() => AuthService.signOut()}>
      Sign Out 👋
    </Button>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Layout style={styles.bannerView}>
        <Text style={styles.bannerText}>Your Surveys 📊</Text>
      </Layout>
      <Layout style={styles.container}>
        <Layout style={{width: '90%', height: 100}}>
          {pre ? noPreSurvey : preSurvey}
        </Layout>
        <Layout style={{width: '90%', height: 100}}>
          {post ? noPostSurvey : postSurvey}
        </Layout>
        <Layout style={{width: '90%', height: 100}}>{signOutButton}</Layout>
      </Layout>
    </SafeAreaView>
  );
};

export default Dashboard;
