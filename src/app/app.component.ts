import { Component, OnChanges, AfterViewInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { AuthService } from './home/service/auth.service';
import {Router} from '@angular/router';
import { ApiService } from './home/service/api.service';
import { LoginUserInfo } from './home/login/LoginUserInfo';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  private isAuth:boolean=false;
  private userInfo:LoginUserInfo;
  constructor(
    private platform: Platform,
    private authService:AuthService,
    private router:Router,
    private apiService:ApiService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
    
    });
  }

  isUserLoggedIn(){
    this.isAuth=this.authService.getUserAuthentication()
    if(this.isAuth){
      this.userInfo=this.apiService.userInfoSubject.value;
    }else{
      this.userInfo=null;
    }
  }

  logout(){
    console.log("Logginout")
    this.authService.logout()
    this.router.navigateByUrl('/home/login')
  }
}
