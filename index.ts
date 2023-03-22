import { Observable, interval } from 'rxjs';
import { ajax, AjaxResponse, AjaxRequest, AjaxError } from 'rxjs/ajax';
const apiKey = 'd0475be3a1967b1b49dfc02c8128001a';
const URL = 
  'https://api.openweathermap.org/data/2.5/weather?APPID=' + apiKey +  '&units=metric&q=Pisa';
const request: AjaxRequest = { url: URL, crossDomain: true, };
const temp: Observable<AjaxResponse<any>> = ajax(request);
const tick: Observable<number> = interval(10000);
const obs: Observable<any> = new Observable((subscriber) =>
  tick.subscribe({
    next: () => {
      temp.subscribe({
        next: (res: AjaxResponse<any>) => subscriber.next(res.response.main.temp),
        error: (err: AjaxError) => console.error('Error: ', err.request),
      });
    },
  })
);
obs.subscribe({ next: (x) => console.log(x) });
obs.subscribe({ next: (x) => (document.getElementById('output').innerHTML += x + '<br>') });
