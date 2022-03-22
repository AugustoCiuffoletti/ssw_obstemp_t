// Mi spiace non funziona...
import { Observable, interval } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
const apiKey = 'd0475be3a1967b1b49dfc02c8128001a';
const URL =
  'https://api.openweathermap.org/data/2.5/weather?APPID=' +
  apiKey +
  '&units=metric&q=';
var city = 'Viterbo';
const obs = ajax(URL + city);
const tick = interval(10000);
// Due subscriber
tick.subscribe({
  next: (x) => {
    obs.subscribe({
      next: (res: AjaxResponse<any>) => console.log(res.response.main.temp),
      error: (err: Error) => console.error("Sorry: ",err.message),
    });
  },
});
tick.subscribe({
  next: (x) => {
    obs.subscribe({
      next: (res: AjaxResponse<any>) =>
        document.getElementById('output').innerHTML +=
          res.response.main.temp + '<br>',
      error: (err: Error) => console.error("Uela! " + err.message),
    });
  },
});
