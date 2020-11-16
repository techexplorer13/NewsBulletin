import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private isUserAuthenticated:boolean=false;

 getUserAuthentication(){
   return this.isUserAuthenticated;
 }
 
 constructor() { }

 login(){
  this.isUserAuthenticated=true;
 }

 logout(){
   this.isUserAuthenticated=false
 }

 fbLogin(){
   return;
 }
}
