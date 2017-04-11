import { observable, computed, action, autorun } from 'mobx';

class SurveyData {
  @observable questions = {};

  constructor (dataFromServer) {
    this.questions = dataFromServer;
    console.log('Got data from server:');
    console.log(this.questions);
  };
};

class AnswerSheet {

  @observable answers = {};

  constructor (questionsFromServer) {
    var that = this;
    Object.keys(questionsFromServer).forEach(function(keyOne) {
      that.answers[keyOne] = {};
      Object.keys(questionsFromServer[keyOne]).forEach(function(keyTwo){
        that.answers[keyOne][keyTwo] = {
          answer: null
        };
      });
    });
  };
};

class ViewStore {

    @observable surveyData = null;
    @observable currentView = null;

    @observable answers = null;

    @computed get currentPath() {
        switch(this.currentView.section) {
            case "intro": return "/intro/"
              break;

            default: return `/section/${this.currentView.section}/question/${this.currentView.question}/`
              break;

        }
    }

    @computed get questionText() {
      return this.surveyData.questions['section' + this.currentView.section]['question' + this.currentView.question].question_text;
    }

    @computed get option_A() {
      return this.surveyData.questions['section' + this.currentView.section]['question' + this.currentView.question].option_A_text;
    }

    @computed get option_B() {
      return this.surveyData.questions['section' + this.currentView.section]['question' + this.currentView.question].option_B_text;
    }

    @action showIntro() {
        this.currentView = {
            section: "intro",
        }
    }

    @action updateAnswers(sectionId, questionId, userAnswer) {

      // UPDATE THE ANSWER SHEET OBSERVABLE WITH THE USER ANSWER
      this.answers['section' + sectionId]['question' + questionId] = userAnswer;

      // NAVIGATE TO THE NEXT SECTION
      var that = this;

      function checkNextSection(sectionId, questionId) {
        if (that.answers['section' + sectionId]['question' + (questionId + 1)] !== undefined){
          var nextQuestionId = questionId + 1;
          that.showSection(sectionId, nextQuestionId)
        } else {
          var nextSectionId = sectionId + 1;
          that.showSection(nextSectionId, 1)
        }
      };

      checkNextSection(sectionId, questionId);
    }

    @action showSection(sectionId, questionId) {
        this.currentView = {
            section: sectionId,
            question: questionId
        }
    }

    constructor (dataFromServer) {
      this.surveyData = new SurveyData(dataFromServer);
      console.log('questions set up successfully');
      console.log(this.surveyData.questions);

      this.answers = new AnswerSheet(dataFromServer).answers;
      console.log('answer sheet set up successfully');
    };

}

export default ViewStore;
