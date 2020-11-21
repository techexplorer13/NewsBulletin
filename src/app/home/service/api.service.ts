import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginUserInfo } from '../login/LoginUserInfo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string = "https://bing-news-search1.p.rapidapi.com/news/search?count=10&freshness=Day&textFormat=Raw&safeSearch=Off&q=";

  public userInfoSubject: BehaviorSubject<LoginUserInfo>;

  constructor(private http: HttpClient) { }

  private httpheaders: HttpHeaders = new HttpHeaders()
    .append("x-rapidapi-host", "bing-news-search1.p.rapidapi.com")
    .append("x-rapidapi-key", "SD9BkTcTYymsh4MyQs90mUTd9jFwp1MElTejsn6gBjrBlzN3KC")
    .append("x-bingapis-sdk", "true")


  public getHeadlines(type: string): Observable<any> {
    return this.http.get(this.url + type, { headers: this.httpheaders });
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
}
