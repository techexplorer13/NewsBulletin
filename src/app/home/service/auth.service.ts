import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { LoginUserInfo } from '../login/LoginUserInfo';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {Urls} from 'src/app/ApiUrls'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserAuthenticated: boolean = false;
  private userInfo: LoginUserInfo;

  constructor(private fb: Facebook, private route:Router,private api:ApiService,private http: HttpClient) {

  }


  getUserAuthentication() {
    return this.isUserAuthenticated;
  }

  logout() {
    this.fbLogout();
    this.isUserAuthenticated = false;
    this.route.navigate(['/home'])
  }

  fbLogin() {
  this.fb.login(['public_profile','email'])

      .then((res: FacebookLoginResponse) => {

        if (res.status == "connected") {

          this.userInfo = new LoginUserInfo();
          this.userInfo.userId = res.authResponse.userID;
          this.http.get(Urls.FACEBOOK_ENDPOINT+res.authResponse.accessToken).subscribe((user:any) => {
            console.log('Logged into Facebook!', user);
            this.userInfo.image = user.picture.data.url;
            this.userInfo.name=user.name;
            this.isUserAuthenticated = true;
            this.api.setUserInfo(this.userInfo);
            this.route.navigate(['home'])
          })

        } else {
          console.log("error logging in")
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
      
  }

  fbLogout() {
    this.fb.logout().then(res => console.log("Logged out"));
    this.api.setUserInfo(new LoginUserInfo())
  }
}
