import { Component, OnInit } from '@angular/core';
import {LoginUserInfo} from '../login/LoginUserInfo'
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-accountinfo',
  templateUrl: './accountinfo.page.html',
  styleUrls: ['./accountinfo.page.scss'],
})
export class AccountinfoPage implements OnInit {

  fbUserInfo:LoginUserInfo;
  constructor(private api:ApiService,private auth:AuthService) { }

  ngOnInit() {
    this.fbUserInfo=this.api.getUserInfo();
  }

  logout(){
    this.auth.logout();
  }
}
