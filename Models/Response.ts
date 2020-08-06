export class Response {
  answers: Answer[];
  surveyType: string;

  constructor(answers: Answer[], surveyType: string) {
    this.answers = answers;
    this.surveyType = surveyType;
  }
}

export enum ResponseType {
  STRING = 'STRING',
  NUMERIC = 'NUMERIC',
  QUESTIONNAIRE = 'QUESTIONNAIRE',
  QUESTIONNAIRELIST = 'QUESTIONNAIRE_LIST',
  BOOLEAN = 'BOOLEAN',
  BOOLEAN_LIST = 'BOOLEAN_LIST',
}

export class Answer {
  question: string;
  response: any;
  responseType: ResponseType;

  constructor(question: string, response: any, responseType: ResponseType) {
    this.question = question;
    this.response = response;
    this.responseType = responseType;
  }
}

export class ListAnswer extends Answer {
  list: string[];

  constructor(
    question: string,
    response: any,
    responseType: ResponseType,
    list: string[],
  ) {
    super(question, response, responseType);
    this.list = list;
  }
}

export enum SurveyType {
  PRE = 'PRE',
  POST = 'POST',
  COVID = 'COVID',
}
