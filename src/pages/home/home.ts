/// <reference path="../../app/WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }


    ionViewDidLoad() {
    console.log('Hello ARView Page');
  }

  ionViewDidEnter() {

      var startupConfiguration: any = {"camera_position": "back"};

      WikitudePlugin.loadARchitectWorld(
          function(success) {
            console.log("ARchitect World loaded successfully.");
          },
          function(fail) {
            console.log("Failed to load ARchitect World!");
          },
          "www/assets/13_PluginsAPI_2_FaceDetection/index.html", 
          // "www/assets/05_InstantTracking_1_SimpleInstantTracking/index.html", //instand tracking
          // [ "poi" ],          
          // "www/assets/3_3dModels_1_3dModelOnTarget/index.html",
          ["ir"], 
          // "www/assets/3_3dModels_6_3dModelAtGeoLocation/index.html",  
          // ["geo"], 
// you find other samples or Wikitude worlds in Wikitude Cordova Plugin
// which can be downloaded from here: https://github.com/Wikitude/wikitude-cordova-plugin/archive/v5.3.1-3.3.2.zip
          <JSON>startupConfiguration
      );
  }



}
