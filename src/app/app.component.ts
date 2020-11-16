import { Component, OnChanges, AfterViewInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { AuthService } from './home/service/auth.service';
import {Router} from '@angular/router'
import {Plugins,Capacitor} from '@capacitor/core'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  private isAuth:boolean=false;
  constructor(
    private platform: Platform,
    private authService:AuthService,
    private router:Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
     if(Capacitor.isPluginAvailable('SplashScreen')){
       Plugins.SplashScreen.hide()
     }
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
