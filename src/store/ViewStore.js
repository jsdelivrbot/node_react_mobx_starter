import { observable, computed, action, autorun } from 'mobx';
import { fromPromise } from 'mobx-utils';

class ViewStore {

    // @observable currentUserIP = null;
    @observable currentView = null;

    @observable answers = {
      section1: {
        question1: null,
        question2: null,
        question3: null,
      },
      section2: {
        question1: null,
        question2: null,
        question3: null,
        question4: null,
        question5: null,
        question6: null,
      },
      section3: {
        question1: null,
        question2: null,
        question3: null,
      },
    };

    // constructor(fetch) {
    //     this.fetch = fetch
    // }

    @computed get currentPath() {
        switch(this.currentView.section) {
            case "intro": return "/intro/"
              break;

            default: return `/section/${this.currentView.section}/question/${this.currentView.question}/`
              break;

        }
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

}

export default ViewStore;
