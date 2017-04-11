
export function fetchSurveyData(url) {
  window.fetch(url, {method: 'get'}).then((res) => {console.log('got data from fetch:'); console.log(res); return res}).catch((err) => {return 'ERROR: ' + err });
}
