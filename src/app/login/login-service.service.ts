import {HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable, tap} from "rxjs";
import { IUser, User } from '../models/user';
import { HttpResponse } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import * as querystring from 'querystring'; // Import the querystring library
type EntityResponseType = HttpResponse<User>;
@Injectable({
  providedIn: 'root', // This ensures the service is available app-wide
})
export class LoginServiceService {
  user: IUser | any=new User();
  private apiURL = 'http://localhost:8000';  // Backend API URL

  constructor(private http: HttpClient) { }


  login(credentials: { username: string, password: string }): Observable<any> {
    const body = querystring.stringify({
      username: credentials.username,
      password: credentials.password
    });

    // Set headers for x-www-form-urlencoded content type
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(`${this.apiURL}/login`, body, { headers })
      .pipe(
        tap(response => {
          // Store JWT token in local storage
          localStorage.setItem('authToken', response.access_token);
          console.log('auth token'+localStorage.getItem('authToken'));
        })
      );
  }

  me(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      'Accept': 'application/json'
    });
    return this.http.get<any>(`${this.apiURL}/users/me`, {headers})
      .pipe(
        tap(response => {
          console.log('Fetch Current User:', response);
        }),
        catchError(error => {
          console.error('Error fetching user:', error);
          return throwError(error);
        })
      );
  }


  findByUserId(userId:string | null):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      'Accept': 'application/json'
    });
    return this.http.get<any>(`${this.apiURL}/users/${userId}`, {headers})
    .pipe(
      tap(response => {
        console.log('Fetch Current User:', response);
      }),
      catchError(error => {
        console.error('Error fetching user:', error);
        return throwError(error);
      })
    );
  }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/users`, user)
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


  updateUser(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.put<any>(`${this.apiURL}/users`, user, {headers})
      .pipe(
        tap(response => {
          console.log('Fetch Update User Response:', response);
        }),
        catchError(error => {
          console.error('Error fetching user:', error);
          return throwError(error);
        })
      );
  }




  logout() {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
