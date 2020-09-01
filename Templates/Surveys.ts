import {ResponseType} from '../Models/Response';

export const Surveys = {
  pre: [
    {
      question: 'Overall, how fatigued are you?',
      type: ResponseType.NUMERIC,
    },
    {
      question: 'Overall, how much muscle soreness do you have?',
      type: ResponseType.NUMERIC,
    },
    {
      question: 'Where are you sore?',
      type: ResponseType.STRING,
    },
    {
      question: 'How many hours did you sleep?',
      type: ResponseType.STRING,
    },
    {
      question: 'Overall, how ready are you to train?',
      type: ResponseType.STRING,
    },
  ],
  post: [
    {
      question: 'How hard was the session on your legs?',
      type: ResponseType.NUMERIC,
    },
    {
      question: 'How hard was the session on your breathing?',
      type: ResponseType.NUMERIC,
    },
    {
      question: 'How technically/tactically demanding was the session?',
      type: ResponseType.NUMERIC,
    },
    {
      question: 'Overall, how hard was the session?',
      type: ResponseType.NUMERIC,
    },
  ],
  covid: [
    {
      question:
        'In the past 72 hours, have you experienced any of the following symptoms?',
      type: ResponseType.QUESTIONNAIRE,
      answers: [
        'None',
        'Shortness of Breath or Difficulty Breathing',
        'Cough',
        'Fever of 100.4 F or higher',
        'Headache',
        'Chills',
        'Sore Throat',
        'Loss of Taste or Smell',
        'Abnormal Muscle Pain',
        'Nasal Congestion',
        'Runny Nose',
        'Diarrhea',
        'Fatigue',
      ],
    },
    {
      question:
        'If you answered “Yes” to any of the above, please provide details',
      type: ResponseType.STRING,
      optional: true,
    },
    {
      question:
        'To your knowledge, have you had a fever at or above 100.4 degrees Fahrenheit?',
      type: ResponseType.BOOLEAN,
      answers: ['Yes', 'No'],
    },
    {
      question:
        'If you answered “Yes,” please provide detail below (including temperature readings, if available)',
      type: ResponseType.STRING,
      optional: true,
    },
    {
      question:
        'Do you have reason to believe that you, or anyone with whom you’ve had close contact, may have been exposed to Covid-19 in the past 14 days?',
      type: ResponseType.BOOLEAN,
      answers: ['Yes', 'No'],
    },
    {
      question:
        'Have you been within six feet of any other Covered Person for fifteen minutes or more since the last time you completed this questionnaire? If so, please list all such individuals(including your roommates)',
      type: ResponseType.BOOLEAN_LIST,
      answers: ['Yes', 'No'],
    },
  ],
};
