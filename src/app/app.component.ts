import { Component, OnChanges,OnInit, AfterViewInit } from '@angular/core';

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
export class AppComponent implements OnInit {
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

  ngOnInit(){
   this.apiService.userInfoSubject.subscribe(res=>{
    this.userInfo=res
   });
  }
}
