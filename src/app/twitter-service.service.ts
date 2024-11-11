import { Injectable } from '@angular/core';
import {Observable, tap} from "rxjs";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TwitterServiceService {
  private apiURL = 'http://localhost:8000';  // Backend API URL

  private serverURL = 'http://localhost:8090/users';  // Backend API URL

  constructor(private http: HttpClient) { }





  fetchPeoples(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      'Accept': 'application/json'
    });
  
    return this.http.get<any>(`${this.apiURL}/follow/suggestions`, {headers})
      .pipe(
        tap(response => {
          console.log('Fetch Suggestion Users:', response);
        }),
        catchError(error => {
          console.error('Error fetching user:', error);
          return throwError(error);
        })
      );
  }

  submitLikes(tweet: { tweer_id: string }):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      'Accept': 'multipart/form-data'
    });
    return this.http.post<any>(`${this.apiURL}/likes`, tweet, { headers })
    .pipe(
        tap(response => {
          console.log('Summit User Response:', response);
        }),
        catchError(error => {
          console.error('Error while submitting user:', error);
          return throwError(error);
        })
      );
  }


  submit(tweet: FormData): Observable<any> {
    console.log('content'+tweet);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      'Accept': 'multipart/form-data'
    });
    return this.http.post<any>(`${this.apiURL}/tweets`, tweet, { headers })
    .pipe(
        tap(response => {
          console.log('Summit User Response:', response);
        }),
        catchError(error => {
          console.error('Error while submitting user:', error);
          return throwError(error);
        })
      );
  }

  fetchTweetById(tweet_id?:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      'Accept': 'application/json'
    });
    return this.http.get<any>(`${this.apiURL}/tweets/${tweet_id}`, {headers})
      .pipe(
        tap(response => {
          console.log('Fetch User Response:', response);
        }),
        catchError(error => {
          console.error('Error fetching user:', error);
          return throwError(error);
        })
      );
  }


  fetchTweets(requestType?:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      'Accept': 'application/json'
    });
    let params = new HttpParams();
    if (requestType) {
      params = params.append('tab', requestType);  // Assuming 'userId' is a parameter in the API
    }
    return this.http.get<any>(`${this.apiURL}/tweets/home`, {headers, params})
      .pipe(
        tap(response => {
          console.log('Fetch User Response:', response);
        }),
        catchError(error => {
          console.error('Error fetching user:', error);
          return throwError(error);
        })
      );
  }


}
