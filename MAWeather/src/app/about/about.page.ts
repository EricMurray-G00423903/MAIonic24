import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  // Method to navigate to the Home page
  navigateToHome() {
    this.navCtrl.navigateRoot('/home');  // Using navigateRoot to make it the root of the navigation stack
  }

  // Method to navigate to the Search page
  navigateToSearch() {
    this.navCtrl.navigateForward('/search');
  }

  // Method to navigate to the Settings page
  navigateToSettings() {
    this.navCtrl.navigateForward('/settings');
  }
}
