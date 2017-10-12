import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      /** Enter your Wikitude (trial) License Key here. You can register and download your free license key here: http://www.wikitude.com/developer/licenses */      
      WikitudePlugin._sdkKey = "vKsgbkHt9GZVvceG+jRBBdXYoAlBVlSc43Y+PJDqdGJBG5A32BHO1/mXVPwUjXy9ppiKugr2Hjd1E0MWPIStvAoS6T8+BzRMOuxGnpqTBZi08LlBSxTMHJZjAouXS4CelTir6EXqUaRb7OR87u6OUleGElDceX0Z2/J1B7Rk1WNTYWx0ZWRfXySdoOL76ab3a5gdLkttfWpEz87xpHvnksoGf1sVtngAJOBMFLePHrQzoS8JDql1OGnCdJsRFCuQUhGbkxu+IwhAAdG/MeLdVwH+BJR37iY8SaMU5AwKOCCpEoOnXGJYCtSbyBY25WI08RdSBrB6hECMbq4k3wU2jumPjW0igobThUWDDeQl6cH8zhuu9PDGW20Eo2/xpPfP74xtE9mAI0qSNjfeA1JMFqeGKjvtEkboHJ1Tx9VcacfSFKbUD5y/VyQjqhjMx65OhgERMd5G434Ae+eg9QssYvNDysF4KImD6L5kzi9bs6y5ppndQeXaN+CpuFm+ucjxVN8XhZn1BcaPXSD2oKVSkwgFHXi/4oN2CFzL4YEZlmlURbCz2ETCKyEmIB9DmcESu59a6lGHoqXV2E8gwNJknD0qwi4J6LCFFrtOIQYaIOOV9r5F/ZrGx8CAcAqKbEHr4g8ngyW+pZttI6KQGISc3BWGaqDrDMi4CsrlZilGWO8=";

      /** Check if your device supports AR */
      WikitudePlugin.isDeviceSupported(
          function(success) {
            console.log("Your platform supports AR/Wikitude. Have fun developing!!");
          },
          function(fail) {
            console.log("Your platform failed to run AR/Wikitude: "+fail);
          },
          [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking 
      );                  

      /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works 
       * through the function below for the direction Ionic2 app --> Wikitude SDK 
       * For calls from Wikitude SDK --> Ionic2 app see the captureScreen example in 
       * WikitudeIonic2StarterApp/www/assets/3_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
      // set the function to be called, when a "communication" is indicated from the AR View  
      WikitudePlugin.setOnUrlInvokeCallback(function(url) {

        // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic2)
        if (url.indexOf('captureScreen') > -1) {
            WikitudePlugin.captureScreen(
                (absoluteFilePath) => {
                    console.log("snapshot stored at:\n" + absoluteFilePath);

                    // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
                    WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath +"');");
                },
                (errorMessage) => {
                    console.log(errorMessage);
                },
                true, null
            );
        } else {
            alert(url + "not handled");
        }
      });

      /**
       * Define the generic ok callback
       */
      WikitudePlugin.onWikitudeOK = function() {
          console.log("Things went ok.");
      }
      
      /**
       * Define the generic failure callback
       */
      WikitudePlugin.onWikitudeError = function() {
          console.log("Something went wrong");
      }

      // Just as an example: set the location within the Wikitude SDK, if you need this (You can get the geo coordinates by using ionic native 
      // GeoLocation plugin: http://ionicframework.com/docs/v2/native/geolocation/
      //WikitudePlugin.setLocation(47, 13, 450, 1);

      /* for Android only
      WikitudePlugin.setBackButtonCallback(
          () => {
              console.log("Back button has been pressed...");
          }
      );                  
      */

    });
  }
}
