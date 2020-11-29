import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginUserInfo } from '../login/LoginUserInfo';
import {Urls} from 'src/app/ApiUrls'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  public userInfoSubject: BehaviorSubject<LoginUserInfo>;

  constructor(private http: HttpClient) { }

  private httpheaders: HttpHeaders = new HttpHeaders()
    .append("x-rapidapi-host", "bing-news-search1.p.rapidapi.com")
    .append("x-rapidapi-key", "2644b7e3ecmsh8af7be1e3ac673fp1d8b7cjsnb9e085c52980")
    .append("x-bingapis-sdk", "true")


  public getHeadlines(offset: string): Observable<any> {
    return this.http.get(Urls.HEADLINES_URL+"&offset="+offset, { headers: this.httpheaders });
  }

  public setUserInfo(userInfo: LoginUserInfo) {
    if (typeof this.userInfoSubject === 'undefined') {
      this.userInfoSubject = new BehaviorSubject(userInfo)
    }
    else {
      this.userInfoSubject.next(userInfo);
    }
  }

  public getUserInfo(): LoginUserInfo {
    return this.userInfoSubject.value;
  }

  public getNews(cat:string,offset):Observable<any>{
    console.log(cat+"::==>inside api");
    return this.http.get(Urls.SEARCH_URL + cat +"&offset="+offset,{headers:this.httpheaders});
  }
}
