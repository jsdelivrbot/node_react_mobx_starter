import React from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { observable, autorun } from 'mobx';

export const App = observer(({ store }) => {

  console.log('hi');

  return (
    <div>
        { renderCurrentView(store) }
        <DevTools />
    </div>
  )
})

// export const App = observer(({ store }) => {
//   return (
//     <div>
//       <h1> hello world </h1>
//     </div>
//   )
// })


function renderCurrentView(store) {

    autorun(() => {
      console.log('the current view is: ', store.currentView);
    })

    console.log('bloop');

    const view = store.currentView;
    console.log(typeof view.section);
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

const Intro = observer(({ store }) => (
    <div>
      <h1>this is the intro</h1>
      <button onClick={() => store.showSection(1,1)}>lets get started</button>
    </div>
))


// NOTE: THE 'VALUE' OF EACH ANSWER WILL REALISTICALLY COME FROM OUR CMS! SO, USE THAT VALUE EXPLICITLY RATHER THAN DECLARING IT HERE
const Section = observer(({ store }) => {

        let questionText = store.questionText;
        let answerA = store.option_A;
        let answerB = store.option_B;

        return (
            <div>
              <h1>section {store.currentView.section}, question {store.currentView.question}</h1>
              <h2>{questionText}</h2>
              <button onClick={() => store.updateAnswers(store.currentView.section, store.currentView.question, true)}>{answerA}</button>
              <button onClick={() => store.updateAnswers(store.currentView.section, store.currentView.question, false)}>{answerB}</button>
            </div>
        )
})

const End = observer(({ store }) => {
        return (
            <div>
              <h1>YOU HAVE REACHED THE END</h1>
            </div>
        )
})
