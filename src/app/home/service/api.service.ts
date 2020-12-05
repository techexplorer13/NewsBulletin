import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginUserInfo } from '../login/LoginUserInfo';
import {Urls} from 'src/app/ApiUrls'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  public userInfoSubject: BehaviorSubject<LoginUserInfo>=new BehaviorSubject(new LoginUserInfo);

  constructor(private http: HttpClient) { }

  private httpheaders: HttpHeaders = new HttpHeaders()
    .append("x-rapidapi-host", "bing-news-search1.p.rapidapi.com")
    .append("x-rapidapi-key", environment.newsKey)
    .append("x-bingapis-sdk", "true")


  public getHeadlines(offset: string): Observable<any> {
    return this.http.get(Urls.HEADLINES_URL+"&offset="+offset, { headers: this.httpheaders });
  }

  public setUserInfo(userInfo: LoginUserInfo) {
  
      this.userInfoSubject.next(userInfo);
    
  }

  public getUserInfo(): LoginUserInfo {
    return this.userInfoSubject.value;
  }

  public getNews(cat:string,offset):Observable<any>{
    console.log(cat+"::==>inside api");
    return this.http.get(Urls.SEARCH_URL + cat +"&offset="+offset,{headers:this.httpheaders});
  }

  public getBooks(searchTxt:string):Observable<any>{
    console.log("Text "+searchTxt)
    return this.http.get(Urls.GOOGLE_BOOKS_API+searchTxt +"&key="+environment.googleBooksApiKey);
  }
}
