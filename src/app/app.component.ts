import { Component, OnChanges, AfterViewInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './home/service/auth.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  private isAuth:boolean=false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService:AuthService,
    private router:Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  isUserLoggedIn(){
    console.log(this.isAuth)
    this.isAuth=this.authService.getUserAuthentication()
  }

  logout(){
    console.log("Logginout")
    this.authService.logout()
    this.isAuth=this.authService.getUserAuthentication()
    this.router.navigateByUrl('/home/login')
  }
}
