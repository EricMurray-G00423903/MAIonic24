import { Component, OnInit, Renderer2, Inject, ChangeDetectorRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  selectedTheme!: boolean; // whether the theme is light/dark on/off
  locationPermission!: boolean; // if permission is granted on/off

  //use renderer2 and changedetectorref to update the theme and DOM to update the theme when its toggled
  constructor(
    private navCtrl: NavController,
    private storageService: StorageService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  //get the theme from storage
  async ngOnInit() {
    const theme = await this.storageService.get('theme');
    this.selectedTheme = theme === 'dark';
    this.locationPermission = await this.storageService.get('geolocationPermission') || false;
    this.applyTheme();
  }

  //method to toggle theme and change in storage
  async toggleTheme() {
    this.selectedTheme = !this.selectedTheme;
    await this.storageService.set('theme', this.selectedTheme ? 'dark' : 'light');
    this.applyTheme();
    this.changeDetectorRef.detectChanges();
  }

  //use renderer to change the dom
  applyTheme() {
    if (this.selectedTheme) {
      this.renderer.addClass(this.document.body, 'dark');
    } else {
      this.renderer.removeClass(this.document.body, 'dark');
    }
  }

  //toggle the location permission in storage
  async toggleLocationPermission() {
    this.locationPermission = !this.locationPermission;
    await this.storageService.set('geolocationPermission', this.locationPermission);
  }

  //clear data storage
  async clearData() {
    await this.storageService.clear();
    this.selectedTheme = false;
    this.locationPermission = false;
    this.applyTheme();
    this.changeDetectorRef.detectChanges();
  }

  //nav/routing methods
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
