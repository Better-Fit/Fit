class SurveyAnswer {
  question: string;
  responseType: string;
  response: string | number;

  constructor(
    question: string,
    responseType: string,
    response: string | number,
  ) {
    this.question = question;
    this.responseType = responseType;
    this.response = response;
  }
}

export default SurveyAnswer;
