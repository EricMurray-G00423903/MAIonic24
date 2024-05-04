import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';


//Super similar code to Home.ts

const API_KEY = environment.API_KEY;
const API_URL = environment.API_URL;

interface WeatherResponse {
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
  };
  weather: WeatherDetail[];
  name: string;
}

interface WeatherDetail {
  id: number;
  main: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchCity: string = '';
  cityName: string = '';
  localTemp: any;
  todaysDate: Date = new Date();
  weatherDetails: WeatherDetail[] = [];
  weatherIcon: string = '';
  loading: any;

  constructor(
    private navCtrl: NavController,
    private httpClient: HttpClient,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'circles'
    });
    await this.loading.present();
  }

  dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }

  //search method call to api to find the city and get the coordinates
  searchForCity() {
    if (!this.searchCity.trim()) return; // Avoid searching for an empty string
    this.presentLoading();
    this.httpClient.get<any[]>(`http://api.openweathermap.org/geo/1.0/direct?q=${this.searchCity}&limit=1&appid=${API_KEY}`)
      .subscribe(response => {
        if (response && response.length > 0) {
          const { lat, lon } = response[0];
          this.pullData(lat, lon);
        } else {
          this.dismissLoading();
          console.error('No city found');
        }
      }, error => {
        console.error('Error searching city', error);
        this.dismissLoading();
      });
  }

  //Pull method from before with nav routing methods below
  pullData(latitude: number, longitude: number) {
    this.httpClient.get<WeatherResponse>(`${API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
      .subscribe(results => {
        this.cityName = results.name;
        this.localTemp = results.main;
        this.weatherDetails = results.weather;
        this.weatherIcon = `https://openweathermap.org/img/wn/${results.weather[0].icon}@4x.png`;
        this.dismissLoading();
      }, error => {
        console.error('Failed to fetch weather data', error);
        this.dismissLoading();
      });
  }

  navigateToHome() {
    this.navCtrl.navigateRoot('/home');
  }

  navigateToSettings() {
    this.navCtrl.navigateForward('/settings');
  }

  navigateToAbout() {
    this.navCtrl.navigateForward('/about');
  }
}
