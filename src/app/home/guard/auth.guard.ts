import { Injectable } from '@angular/core';
import { Router,Route, UrlTree, CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService,private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  
  {   
    console.log("enter auard")
      if(!this.authService.getUserAuthentication()){
          this.router.navigate(['/home/login'])
      }
      return this.authService.getUserAuthentication() 
  }
  
}
