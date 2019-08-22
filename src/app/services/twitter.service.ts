import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  private hostname = window.location.hostname;
  baseUrl = "http://"+this.hostname+":3000/";

  constructor(private http: HttpClient, private router: Router) { }

  public twitterverification():Observable<any>{
    return this.http.get(this.baseUrl+'twitter/verifyuser');
  }

  public twitterlogin():Observable<any>{
    return this.http.get(this.baseUrl+'auth/twitter');
  }

  public gettweets():Observable<any>{
    console.log(this.baseUrl+'auth/twitter/getsavedtweets')
    return this.http.get(this.baseUrl+'auth/twitter/getsavedtweets');
  }

  public gethashtagsearchtweets(searchtweets):Observable<any>{
    return this.http.get(this.baseUrl+'auth/twitter/gethashtagsearchtweets?search='+searchtweets);
  }
  
  public getlocationsearchtweets(searchtweets):Observable<any>{
    return this.http.get(this.baseUrl+'auth/twitter/getlocationsearchtweets?search='+searchtweets);
  }
  
}
