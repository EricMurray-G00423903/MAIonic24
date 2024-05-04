import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { environment } from 'src/environments/environment';

//https://coolors.co/020202-1f7a8c-fafafa-e3f2fd-db5461

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
    this.getCurrentLocation()
  }
  async getCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.pullData(coordinates.coords.latitude, coordinates.coords.longitude);
    } catch (e) {
      console.error('Error getting location', e);
    }
  }

  pullData(latitude: number, longitude: number) {
    const API_KEY = environment.API_KEY;
    const API_URL = environment.API_URL;
    this.httpClient.get<WeatherResponse>(`${API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`).subscribe(results => {
      this.localTemp = results.main;
      this.weatherDetails = results.weather;
      this.cityName = results.name;
      this.weatherIcon = `https://openweathermap.org/img/wn/${this.weatherDetails[0].icon}@4x.png`;
    });
  }

}
