import { Injectable } from '@angular/core';
import { Router,Route, UrlSegment, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService:AuthService,private router:Router){}
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean
  {   console.log("enter auard")
      if(!this.authService.getUserAuthentication()){
          this.router.navigate(['/home/login'])
      }
      return this.authService.getUserAuthentication() 
  }
  
}
