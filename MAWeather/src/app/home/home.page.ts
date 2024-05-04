import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
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
  weatherDetails: WeatherDetail[] = []
  weatherIcon: any
  loading: any

  constructor(public httpClient:HttpClient, public loadingController: LoadingController, private navCtrl: NavController) {
    this.presentLoading()
    this.getCurrentLocation()
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'circles' // You can choose different spinner styles or customize it
    });
    await this.loading.present();
  }

  dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }

  async getCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.pullData(coordinates.coords.latitude, coordinates.coords.longitude);
    } catch (e) {
      console.error('Error getting location', e);
      this.dismissLoading();
      this.setDefaultLocation();
    }
  }
  

  setDefaultLocation() {
    const defaultLat = 53.3498; // Latitude for Dublin
    const defaultLon = -6.2603; // Longitude for Dublin
    this.pullData(defaultLat, defaultLon);
  }
  

  pullData(latitude: number, longitude: number) {
    this.httpClient.get<WeatherResponse>(`${API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`).subscribe(
      results => {
        this.localTemp = results.main;
        this.weatherDetails = results.weather;
        this.cityName = results.name;
        this.weatherIcon = `https://openweathermap.org/img/wn/${this.weatherDetails[0].icon}@4x.png`;
        this.dismissLoading();
      },
      error => {
        console.error('Failed to fetch weather data', error);
        this.dismissLoading();
      }
    );
  }

  navigateToSearch() {
    this.navCtrl.navigateForward('/search');
  }

  navigateToSettings() {
    this.navCtrl.navigateForward('/settings');
  }

  navigateToAbout() {
    this.navCtrl.navigateForward('/about');
  }
  

}
