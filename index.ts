import { Observable, interval } from 'rxjs';
const apiKey = 'd0475be3a1967b1b49dfc02c8128001a';
const URL =
  'https://api.openweathermap.org/data/2.5/weather?APPID=' + apiKey + '&units=metric&q=Pisa';
const tick: Observable<number> = interval(10000);
const temp: Observable<any> = new Observable((subscriber) =>
  tick.subscribe({
    next: () => {
      fetch(URL)
        .then((response) => response.json())
        .then((data) => subscriber.next(data.main.temp));
    },
    error: (err) => console.log('Errore: ', err),
  })
);
temp.subscribe({
  next: (x) => console.log(x),
});
temp.subscribe({
  next: (x) => (document.getElementById('output').innerHTML += x + '<br>'),
});
