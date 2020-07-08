import SurveyAnswer from './SurveyAnswer';

class SurveySubmission {
  answers: SurveyAnswer[];

  constructor(answers: SurveyAnswer[]) {
    this.answers = answers;
  }
}

export default SurveySubmission;
