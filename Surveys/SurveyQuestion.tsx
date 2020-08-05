/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {
  Input,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Button,
  Text,
  Radio,
  RadioGroup,
  CheckBox as KittenCheckBox,
} from '@ui-kitten/components';
import {Difficulties} from '../Templates/Difficulties';
import {Feelings} from '../Templates/Feelings';
import SurveyAnswer from '../Models/SurveyAnswer';
import {storeItemInCache} from '../Utils/cache.util';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native-gesture-handler';
import {Answer, ListAnswer, ResponseType} from '../Models/Response';

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
  const survey = route.params.survey;

  const navigateBack = () => {
    navigation.goBack();
  };
  const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const next = (response: any, list?: string[]) => {
    // Add response, if at end then submit and store date and type and go to dashboard, of not at end navigate to route.params.index + 1
    const currentIndex = route.params.index;
    const surveyLength = route.params.surveyLength;
    const submitSurvey = route.params.submitSurvey;

    console.log('SCREEN_RESPONSE:', response, list);

    let answer: Answer;

    if (response || survey.optional) {
      if (list == undefined) {
        answer = new Answer(survey.question, response, survey.type);
      } else {
        answer = new ListAnswer(survey.question, response, survey.type, list);
      }

      route.params.addResponse(answer, currentIndex);

      if (currentIndex + 1 == surveyLength) {
        submitSurvey(survey.type).then(() => {
          storeItemInCache(route.params.surveyType, new Date().getDate());
          navigation.navigate('Dashboard');
        });
      } else {
        navigation.navigate(currentIndex + 1 + '');
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

          {survey.type == ResponseType.NUMERIC ? (
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
            <></>
          )}

          {survey.type == ResponseType.STRING ? (
            <FormSubmission next={next} />
          ) : (
            <></>
          )}

          {survey.type == ResponseType.QUESTIONAIRRE ? (
            <Questionairre survey={survey} next={next} />
          ) : (
            <></>
          )}

          {survey.type == ResponseType.QUESTIONAIRRE_LIST ? (
            <QuestionairreList survey={survey} next={next} />
          ) : (
            <></>
          )}

          {survey.type == ResponseType.BOOLEAN ? (
            <BooleanQuestion survey={survey} next={next} />
          ) : (
            <></>
          )}

          {survey.type == ResponseType.BOOLEAN_LIST ? (
            <BooleanListQuestion survey={survey} next={next} />
          ) : (
            <></>
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
          returnKeyType="next"
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

// Questionarrire components

const Questionairre = (props) => {
  const [flip, setFlip] = React.useState(false);
  const survey = props.survey;
  const answersMap = survey.answers.map((answer) => {
    return {
      id: answer,
      title: answer,
    };
  });

  const selectedAnswers: string[] = [];
  const addSelectedAnswer = (answer: string) => {

    if (selectedAnswers.indexOf(answer) === -1) {
      selectedAnswers.push(answer);
    }
  };
  const removeSelectedAnswer = (answer: string) => {
    if (selectedAnswers.indexOf(answer) !== -1) {
      selectedAnswers.splice(selectedAnswers.indexOf(answer), 1);
    }
  };

  const renderItem = (item) => {
    return (
      <Layout
        style={{width: '100%', justifyContent: 'flex-end', height: 80}}
        key={item.id}>
        <QuestionairreAnswer
          selected={selectedAnswers.indexOf(item.title) != -1}
          text={item.title}
          addSelectedAnswer={addSelectedAnswer}
          removeSelectedAnswer={removeSelectedAnswer}
        />
        <Layout
          style={{height: 1, width: '100%', backgroundColor: 'lightgrey'}}
        />
      </Layout>
    );
  };

  return (
    <Layout
      style={{
        justifyContent: 'flex-start',
        height: '80%',
        width: '90%',
      }}>
      <ScrollView indicatorStyle="white">
        {answersMap.map((answerObject) => {
          return renderItem(answerObject);
        })}
        <Button
          onPress={() => props.next(selectedAnswers)}
          appearance="outline"
          size="giant"
          status="primary">
          Next
        </Button>
      </ScrollView>
    </Layout>
  );
};

const QuestionairreAnswer = (props) => {
  const [selected, setSelected] = React.useState(props.selected);
  console.log('PROPS', props.selected);

  return (
    <TouchableOpacity
      onPress={() => {
        props.addSelectedAnswer(props.text);
        setSelected(!selected);
      }}
      style={{
        justifyContent: 'flex-end',
        height: 60,
        alignItems: 'flex-start',
        width: '100%',
      }}>
      <Layout style={{flexDirection: 'row', height: '100%', width: '100%'}}>
        <Layout
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '10%',
          }}>
          <Layout
            style={{
              borderRadius: 15,
              borderWidth: 2,
              borderColor: 'lightgrey',
              height: 30,
              width: 30,
              backgroundColor: selected ? 'lightgreen' : 'white',
            }}
          />
        </Layout>
        <Layout
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            flexWrap: 'wrap',
            height: '100%',
          }}>
          <Text style={{fontSize: 20}}>{props.text}</Text>
        </Layout>
      </Layout>
    </TouchableOpacity>
  );
};

const QuestionairreList = (props) => {
  const [listItems, setListItems] = React.useState<string[]>([]);
  const survey = props.survey;
  const answersMap = survey.answers.map((answer) => {
    return {
      id: answer,
      title: answer,
    };
  });

  const selectedAnswers: string[] = [];
  const addSelectedAnswer = (answer: string) => {
    if (selectedAnswers.indexOf(answer) === -1) {
      selectedAnswers.push(answer);
    }

    console.log(selectedAnswers);
  };
  const removeSelectedAnswer = (answer: string) => {
    if (selectedAnswers.indexOf(answer) !== -1) {
      selectedAnswers.splice(selectedAnswers.indexOf(answer), 1);
    }

    console.log(selectedAnswers);
  };

  const renderItem = (item) => {
    return (
      <Layout
        style={{width: '100%', justifyContent: 'flex-end', height: 80}}
        key={item.id}>
        <QuestionairreAnswer
          text={item.title}
          addSelectedAnswer={addSelectedAnswer}
          removeSelectedAnswer={removeSelectedAnswer}
        />
        <Layout
          style={{height: 1, width: '100%', backgroundColor: 'lightgrey'}}
        />
      </Layout>
    );
  };

  const itemAdded = (item) => {
    listItems.push(item as string);
    console.log(listItems);
    setListItems([...listItems]);
  };

  return (
    <SafeAreaView
      style={{
        justifyContent: 'flex-start',
        width: '90%',
        flex: 1,
      }}>
      <ScrollView indicatorStyle="white">
        {answersMap.map((answerObject) => {
          return renderItem(answerObject);
        })}
        <Layout
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Layout
            style={{
              height: 80,
              width: '100%',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
            }}>
            <Text category="h4">List Answers</Text>
          </Layout>
          <ListInput itemAdded={itemAdded} />
          {console.log('LIST:', listItems)}
          {listItems.map((listItem) => {
            return <ListInput itemAdded={itemAdded} />;
          })}
          <Button
            style={{width: '100%'}}
            onPress={() => props.next(selectedAnswers, listItems)}
            appearance="outline"
            size="giant"
            status="primary">
            Next
          </Button>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const ListInput = (props) => {
  const [text, setText] = React.useState('');

  const keyPressed = (e) => {
    console.log(e.nativeEvent.text);
    props.itemAdded(e.nativeEvent.text);
  };

  return (
    <Layout style={{width: '100%', justifyContent: 'flex-end', height: 100}}>
      <Layout
        style={{
          flexDirection: 'row',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
        }}>
        <Layout
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            height: '50%',
          }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#3366FF',
              height: 40,
              paddingLeft: '3%',
              borderRadius: 4,
            }}
            value={text}
            onChangeText={setText}
            placeholder="List Answer"
            placeholderTextColor="#3366FF"
            returnKeyType="done"
            onSubmitEditing={keyPressed}
          />
        </Layout>
      </Layout>
    </Layout>
  );
};

// Boolean components
// TODO: - Break these up into their own files

const BooleanQuestion = (props) => {
  const survey = props.survey;
  const answersMap = survey.answers.map((answer) => {
    return {
      id: answer,
      title: answer,
    };
  });
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const renderItem = (item) => {
    return <Radio>{item.title}</Radio>;
  };

  return (
    <Layout
      style={{
        justifyContent: 'flex-start',
        height: '80%',
        width: '90%',
      }}>
      <ScrollView indicatorStyle="white">
        <RadioGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          {answersMap.map((answerObject) => {
            return renderItem(answerObject);
          })}
        </RadioGroup>
        <Button
          onPress={() => props.next(answersMap[selectedIndex].title)}
          appearance="outline"
          size="giant"
          status="primary">
          Next
        </Button>
      </ScrollView>
    </Layout>
  );
};

const BooleanListQuestion = (props) => {
  const [listItems, setListItems] = React.useState<string[]>([]);

  const survey = props.survey;
  const answersMap = survey.answers.map((answer) => {
    return {
      id: answer,
      title: answer,
    };
  });
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const renderItem = (item) => {
    return <Radio>{item.title}</Radio>;
  };

  const itemAdded = (item) => {
    listItems.push(item as string);
    console.log(listItems);
    setListItems([...listItems]);
  };

  return (
    <SafeAreaView
      style={{
        justifyContent: 'flex-start',
        width: '90%',
        flex: 1,
      }}>
      <ScrollView indicatorStyle="white">
        <RadioGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          {answersMap.map((answerObject) => {
            return renderItem(answerObject);
          })}
        </RadioGroup>
        <Layout
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Layout
            style={{
              height: 80,
              width: '100%',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
            }}>
            <Text category="h4">List Answers</Text>
          </Layout>
          <ListInput itemAdded={itemAdded} />
          {console.log('LIST:', listItems)}
          {listItems.map((listItem) => {
            return <ListInput itemAdded={itemAdded} />;
          })}
          <Button
            style={{width: '100%'}}
            onPress={() =>
              props.next(answersMap[selectedIndex].title, listItems)
            }
            appearance="outline"
            size="giant"
            status="primary">
            Next
          </Button>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};
