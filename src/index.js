import React from 'react';
import ReactDOM from 'react-dom';
import ViewStore from './store/ViewStore';
import { startRouter } from './store/router';
import { fetchSurveyData } from './store/fetchData';

import { App } from './components/App';
//
// Prepare DOM (normally you would do this in HTML, but this simplifies webpack setup)
const root = document.createElement('div');
root.id = 'app';
document.body.appendChild(root);

let surveyData;

window.fetch('/api/questions', {method: 'get'}).then((res) => {
  return res.json().then((json) => {
    surveyData = json;

    // Prepare viewStore
    const viewStore = new ViewStore(surveyData);
    startRouter(viewStore)

    console.log('test');
    console.log(viewStore);

    ReactDOM.render(
      <App store= { viewStore } />,
      document.querySelector('#app')
    );

    // Hot Module Replacement API
    if (module.hot) {
      console.log('its hot ');
      module.hot.accept(() => {
        ReactDOM.render(
          <App store= { viewStore } />,
          document.querySelector('#app')
        );
      });
    }

  });
}).catch((err) => {return 'ERROR: ' + err });
