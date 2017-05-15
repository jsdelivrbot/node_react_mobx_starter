import React, { Component } from 'react';
import { observer, Provider, inject } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { observable, autorun } from 'mobx';




function renderCurrentView(store) {

    console.log('the current view is: ', store.currentView);

    const view = store.currentView;
    switch (Number(view.section)) {
        case 0:
            return <Intro />
            break;
        case 1:
        case 2:
        case 3:
            return <Section />
            break;
        default:
            return  <Intro />
            break;
    }
}1.

@observer
export class App extends Component {

  render(){
    return (
      <Provider store={this.props.store} >
        <div>
            { renderCurrentView(this.props.store) }
            <DevTools />
        </div>
      </Provider>
    )
  }
}

@inject("store") @observer
class Intro extends Component {
  render(){
    return(
      <div>
        <h1>this is the intro</h1>
        <button onClick={() => this.props.store.showSection(1,1)}>lets get started</button>
      </div>
    )}}

@inject("store") @observer
class Test extends Component {
  render(){
    return <h1>{this.props.store.testVar}</h1>
  }
}

@inject("store") @observer
class Section extends Component {

        store = this.props.store;

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
              <Test />
            </div>
        )
      }
}


@inject("store") @observer
class End extends Component {
  render(){
    return(
      <div>
        <h1>YOU HAVE REACHED THE END</h1>
      </div>
    )
  }}
