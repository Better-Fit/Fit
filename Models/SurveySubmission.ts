import SurveyAnswer from './SurveyAnswer';

class SurveySubmission {
  answers: SurveyAnswer[];
  surveyType: string;

  constructor(answers: SurveyAnswer[], surveyType: string) {
    this.answers = answers;
    this.surveyType = surveyType;
  }
}

export default SurveySubmission;
