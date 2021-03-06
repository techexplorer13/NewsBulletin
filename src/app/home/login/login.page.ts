import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  isAuth: boolean;
  ngOnInit() {
    this.isAuth = this.authService.getUserAuthentication()
  }

  login() {
    this.router.navigateByUrl('/home/accountinfo')
  }

  fblogin() {
    this.authService.fbLogin();
  }

}
