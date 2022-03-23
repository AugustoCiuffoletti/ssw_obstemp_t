import { Observable, interval } from 'rxjs';
import { ajax, AjaxResponse, AjaxRequest, AjaxError } from 'rxjs/ajax';
const apiKey = 'd0475be3a1967b1b49dfc02c8128001a';
const URL =
  'https://api.openweathermap.org/data/2.5/weather?APPID=' + apiKey + '&units=metric&q=';
var city = 'Pisa';
const request: AjaxRequest = {
  url: URL + city,
  crossDomain: true,
};
const temp: Observable<AjaxResponse<any>> = ajax(request);
const tick: Observable<number> = interval(10000);
tick.subscribe({ // Primo subscriber
  next: (x) => {
    temp.subscribe({
      next: (res: AjaxResponse<any>) => console.log(res.response.main.temp),
      error: (err: AjaxError) => console.error('Sorry: ', err.request) }) } });
tick.subscribe({ // Secondo subscriber
  next: (x) => {
    temp.subscribe({
      next: (res: AjaxResponse<any>) =>
        (document.getElementById('output').innerHTML +=
          res.response.main.temp + '<br>'),
      error: (err: AjaxError) => console.error('Uela! ', err.request) }) } });