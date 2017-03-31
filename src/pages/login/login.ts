import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AF} from "../../providers/af";
import {Page1} from '../page1/page1';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,public afService: AF) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.afService.loginWithGoogle().then((data) => {
      // Send them to the homepage if they are logged in
      this.navCtrl.setRoot(Page1,{});
    })
  }

}
