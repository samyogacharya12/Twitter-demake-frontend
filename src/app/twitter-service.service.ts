import { Injectable } from '@angular/core';
import {Observable, tap} from "rxjs";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class TwitterServiceService {
  private apiURL = 'http://localhost:8090';  // Backend API URL


  constructor(private http: HttpClient) { }


  fetchTweets(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/users/tweets`)
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
