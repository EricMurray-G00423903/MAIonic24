import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_KEY = environment.API_KEY;
const API_URL = environment.API_URL;

interface WeatherResponse {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: WeatherDetail[];
  name: string
}

interface WeatherDetail {
  id: number;
  main: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  cityName: any
  localTemp: any
  todaysDate = new Date()
  weatherDetails: WeatherDetail[] = [];
  weatherIcon: any

  constructor(public httpClient:HttpClient) {
    this.pullData()
  }

  pullData() {
    this.httpClient.get<WeatherResponse>(`${API_URL}weather?q=${"Dublin,IE"}&appid=${API_KEY}`).subscribe(results => {
      console.log(results)
      this.localTemp = results.main;
      this.weatherDetails = results.weather;
      this.cityName = results.name
      this.weatherIcon = `https://openweathermap.org/img/wn/${this.weatherDetails[0].icon}@4x.png`
      console.log(this.localTemp);
      console.log(this.weatherDetails);
      console.log(this.cityName);
      
    
    })
  }

}
