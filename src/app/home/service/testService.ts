import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TestService {
    constructor(private http: HttpClient) { }

    public getNewsTest(): Observable<any> {
        return this.http.get('assets/news.json')
    }
}