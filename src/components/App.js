import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { observable, autorun } from 'mobx';




function renderCurrentView(store) {

    console.log('the current view is: ', store.currentView);

    const view = store.currentView;
    switch (Number(view.section)) {
        case 0:
            return <Intro view={view} store={store} />
            break;
        case 1:
            return <Section view={view} store={store} />
            break;
        case 2:
            return <Section view={view} store={store} />
            break;
        case 3:
            return <Section view={view} store={store} />
            break;
        default:
            return  <Intro view={view} store={store} />
            break;
    }
}

export const App = observer(({ store }) => {

  return (
    <div>
        { renderCurrentView(store) }
        <DevTools />
    </div>
  )
})

const Intro = observer(({ store }) => (
    <div>
      <h1>this is the intro</h1>
      <button onClick={() => store.showSection(1,1)}>lets get started</button>
    </div>
))

@observer
class Section extends Component {

        @observable store = this.props.store;
        @observable num = Math.random();

        render(){
        let questionText = this.store.questionText;
        let answerA = this.store.option_A;
        let answerB = this.store.option_B;

        return (
            <div>
              <h1>section {this.store.currentView.section}, question {this.store.currentView.question}</h1>
              <h2>{questionText}</h2>
              <button onClick={() => {this.num = Math.random()}}>Number is {this.num}</button>
              <button onClick={() => this.store.updateAnswers(this.store.currentView.section, this.store.currentView.question, true)}>{answerA}</button>
              <button onClick={() => this.store.updateAnswers(this.store.currentView.section, this.store.currentView.question, false)}>{answerB}</button>
            </div>
        )
      }
}

const End = observer(({ store }) => {
        return (
            <div>
              <h1>YOU HAVE REACHED THE END</h1>
            </div>
        )
})
