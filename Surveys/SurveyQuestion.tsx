/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Input,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Button,
  Text,
} from '@ui-kitten/components';
import {Difficulties} from '../Templates/Difficulties';
import {Feelings} from '../Templates/Feelings';
import SurveyAnswer from '../Models/SurveyAnswer';

export const SurveyQuestion = ({navigation, route}) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const next = (response) => {
    route.params.addResponse(
      new SurveyAnswer(route.params.survey.question, 'string', response),
      route.params.index,
    );
    if (route.params.index + 1 === route.params.surveyLength) {
      route.params.submitSurvey();
      console.log('Survey Submitted 😀');
    } else {
      navigation.navigate(`${route.params.index + 1}`);
    }
  };

  const checkedType =
    route.params.surveyType === 'pre' ? Feelings : Difficulties;
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
          style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <QuestionHeader question={route.params.survey.question} />
          {checkedType.map((entry, index) => (
            <Rating
              color={entry.color}
              difficulty={entry.level}
              message={entry.message}
              next={next}
              key={index}
            />
          ))}
        </Layout>
      </SafeAreaView>
    </>
  );
};

const QuestionHeader = (props) => {
  const styles = StyleSheet.create({
    questionContainer: {
      padding: '2%',
    },
    questionText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <Layout style={styles.questionContainer}>
      <Text style={styles.questionText}>{props.question}</Text>
    </Layout>
  );
};

const Rating = (props) => {
  const styles = StyleSheet.create({
    ratingBox: {
      marginVertical: '2%',
      height: '5.5%',
      width: '80%',
      borderRadius: 5,
      justifyContent: 'center',
      backgroundColor: props.color,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    innerRatingBox: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: 'transparent',
    },
    ratingNumberBox: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    ratingNumberMessage: {
      fontSize: 18,
      fontWeight: '700',
    },
    ratingMessageBox: {
      flex: 2,
      alignItems: 'flex-start',
      backgroundColor: 'transparent',
    },
    ratingMessageMessage: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  return (
    <Layout style={styles.ratingBox}>
      <TouchableOpacity onPress={() => props.next(props.difficulty)}>
        <Layout style={styles.innerRatingBox}>
          <Layout style={styles.ratingNumberBox}>
            <Text style={styles.ratingNumberMessage}>{props.difficulty}</Text>
          </Layout>
          <Layout style={styles.ratingMessageBox}>
            <Text style={styles.ratingMessageMessage}>{props.message}</Text>
          </Layout>
        </Layout>
      </TouchableOpacity>
    </Layout>
  );
};
