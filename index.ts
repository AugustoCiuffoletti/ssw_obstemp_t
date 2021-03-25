import { ajax } from 'rxjs/ajax';
import { Observable, interval } from "rxjs";

const apiKey = "9bd419b49d4261031516ad5fddac3439";
const URL =
  "https://api.openweathermap.org/data/2.5/weather?APPID=" +
  apiKey +
  "&units=metric&q=";

var city="Pisa";

const tick = interval(10000);

tick.subscribe( (n) => { 
    fetch(URL + city)
      .then(response =>  response.json())
        .then(data => 
          document.getElementById("output").innerHTML+=data.main.temp+"<br>");
  }
); //Costruisco l'observable
