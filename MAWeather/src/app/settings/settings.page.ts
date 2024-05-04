import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service'; // Adjust the path as necessary

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  selectedTheme!: boolean; // Definite assignment assertion
  locationPermission!: boolean; // Definite assignment assertion

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService // Inject StorageService
  ) {}

  async ngOnInit() {
    this.selectedTheme = await this.storageService.get('theme') === 'light' ? false : true;
    this.locationPermission = await this.storageService.get('geolocationPermission') || false;
  }

  async toggleTheme() {
    this.selectedTheme = !this.selectedTheme;
    await this.storageService.set('theme', this.selectedTheme ? 'dark' : 'light');
  }

  async toggleLocationPermission() {
    this.locationPermission = !this.locationPermission;
    await this.storageService.set('geolocationPermission', this.locationPermission);
  }

  async clearData() {
    console.log('Clearing data...');
    await this.storageService.clear();
    this.selectedTheme = false; // Reset to default light theme
    this.locationPermission = false; // Reset to default deny
  }

  navigateToHome() {
    this.navCtrl.navigateRoot('/home');
  }

  navigateToSearch() {
    this.navCtrl.navigateForward('/search');
  }

  navigateToAbout() {
    this.navCtrl.navigateForward('/about');
  }
}
