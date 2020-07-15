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
import {storeItemInCache} from '../Utils/cache.util';
import {showMessage, hideMessage} from 'react-native-flash-message';

const showFields = () => {
  showMessage({
    message: 'Please complete field',
    type: 'danger',
  });

  setTimeout(() => {
    hideMessage();
  }, 3000);
};


export const SurveyQuestion = ({navigation, route}) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const next = (response) => {
    if (response) {
      route.params.addResponse(
        new SurveyAnswer(route.params.survey.question, 'string', response),
        route.params.index,
      );
      if (route.params.index + 1 === route.params.surveyLength) {
        route.params.submitSurvey();
        storeItemInCache(
          `${route.params.surveyType}`,
          new Date().getDate(),
        ).then(() => navigation.navigate('Dashboard'));
        console.log('Survey Submitted 😀');
      } else {
        navigation.navigate(`${route.params.index + 1}`);
      }
    } else {
      showFields();
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
          {route.params.survey.type == 'numeric' ? (
            checkedType.map((entry, index) => (
              <Rating
                color={entry.color}
                difficulty={entry.level}
                message={entry.message}
                next={next}
                key={index}
              />
            ))
          ) : (
            <FormSubmission next={next} />
          )}
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

const FormSubmission = (props) => {
  const [formSubmission, setFormSubmission] = React.useState('');
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
      <Layout style={{height: 90, width: '75%'}}>
        <Input
          textContentType="none"
          size="large"
          value={formSubmission}
          placeholder="Response"
          onChangeText={(nextValue) => setFormSubmission(nextValue)}
        />
      </Layout>
      <Layout style={{width: '75%'}}>
        <Button
          onPress={() => props.next(formSubmission)}
          style={styles.buttonStyle}
          appearance="outline"
          size="giant"
          status="primary">
          💨 Next
        </Button>
      </Layout>
    </>
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
    buttonStyle: {
      backgroundColor: props.color,
      borderWidth: 0,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      width: '75%',
      marginVertical: '1%',
    },
  });

  const d = props.difficulty;

  const emoji =
    d === 1
      ? '🥳'
      : d === 2
      ? '😁'
      : d === 3
      ? '😃'
      : d === 4
      ? '😊'
      : d === 5
      ? '🙂'
      : d === 6
      ? '🙃'
      : d === 7
      ? '😐'
      : d === 8
      ? '😪'
      : d === 9
      ? '🥵'
      : d === 10
      ? '🤬'
      : '';

  return (
    <Button
      style={styles.buttonStyle}
      size="large"
      appearance="outline"
      status="control"
      onPress={() => props.next(props.difficulty)}>
      {props.message}
    </Button>
    // <Layout style={styles.ratingBox}>
    //   <TouchableOpacity onPress={() => props.next(props.difficulty)}>
    //     <Layout style={styles.innerRatingBox}>
    //       <Layout style={styles.ratingNumberBox}>
    //         <Text style={styles.ratingNumberMessage}>{props.difficulty}</Text>
    //       </Layout>
    //       <Layout style={styles.ratingMessageBox}>
    //         <Text style={styles.ratingMessageMessage}>{props.message}</Text>
    //       </Layout>
    //     </Layout>
    //   </TouchableOpacity>
    // </Layout>
  );
};
