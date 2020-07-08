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
import {Surveys} from '../Templates/Surveys';

export const SurveyQuestion = ({navigation, route}) => {
  const surveyLength = () => {
    return Surveys[route.params.surveyType].length;
  };

  const next = (response) => {
    route.params.addResponse(response);
    if (route.params.index + 1 === surveyLength()) {
      console.log('Made it to Narnia');
    } else {
      navigation.navigate(`${route.params.index + 1}`);
    }
  };

  const checkedType =
    route.params.surveyType === 'pre' ? Feelings : Difficulties;
  return (
    <Layout style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <QuestionHeader question={route.params.survey.question} />
      {checkedType.map((entry, key) => (
        <Rating
          color={entry.color}
          difficulty={entry.level}
          message={entry.message}
          next={next}
        />
      ))}
    </Layout>
  );
};

const QuestionHeader = (props) => {
  const styles = StyleSheet.create({
    questionContainer: {
      padding: '2%',
    },
    questionText: {
      fontSize: 18,
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