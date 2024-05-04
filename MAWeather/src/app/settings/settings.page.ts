import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { StorageService } from '../services/storage.service'; // Ensure the path is correct

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
    private storageService: StorageService, // Inject StorageService
    private renderer: Renderer2, // Add Renderer2 for DOM manipulation
    @Inject(DOCUMENT) private document: Document // Inject Document to access DOM
  ) {}

  async ngOnInit() {
    // Check the current theme and location permission from storage and apply them
    const theme = await this.storageService.get('theme');
    this.selectedTheme = theme === 'dark'; // True if dark, false if not set or light
    this.locationPermission = await this.storageService.get('geolocationPermission') || false;
    this.applyTheme(); // Apply the theme on initial load
  }

  async toggleTheme() {
    console.log("Current theme before toggle:", this.selectedTheme ? 'dark' : 'light');
    // Toggle the theme state
    this.selectedTheme = !this.selectedTheme;
    console.log("New theme after toggle:", this.selectedTheme ? 'dark' : 'light');
    // Update the theme in storage
    await this.storageService.set('theme', this.selectedTheme ? 'dark' : 'light');
    // Apply the theme
    this.applyTheme();
}



  applyTheme() {
    // Toggle 'dark' class on the body based on the selectedTheme
    if (this.selectedTheme) {
      this.renderer.addClass(this.document.body, 'dark');
    } else {
      this.renderer.removeClass(this.document.body, 'dark');
    }
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
    this.applyTheme(); // Reset theme to light after clearing data
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
