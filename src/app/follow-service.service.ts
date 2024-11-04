import { HttpClient, HttpHeaders } from '@angular/common/http'; // Ensure HttpClient is imported
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  
  private apiURL = 'http://localhost:8000'; // Your API URL

  constructor(private http: HttpClient) {}  // Inject HttpClient here

  fetchFollowers(userId?:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      'Accept': 'application/json'
    });
      let params = new HttpParams();
    if (userId) {
      params = params.append('user_id', userId);  // Assuming 'userId' is a parameter in the API
    }
    return this.http.get<any>(
      `${this.apiURL}/follow/following`, 
      { headers,params} // Pass headers as options, not body
    ).pipe(
      tap(response => {
        console.log('Fetch Follow for followers:', response);
      }),
      catchError(error => {
        console.error('Error while fetching user:', error);
        return throwError(error);
      })
    );
  }


  follow(userId?: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      'Accept': 'application/json'
    });
  
    console.log('Headers:', headers);
  
    return this.http.post<any>(
      `${this.apiURL}/follow/${userId}`, 
      {}, // Body is empty for this request
      { headers } // Pass headers as options, not body
    ).pipe(
      tap(response => {
        console.log('Fetch Follow Response:', response);
      }),
      catchError(error => {
        console.error('Error fetching user:', error);
        return throwError(error);
      })
    );
  }
  

  delete(userId?: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      'Accept': 'application/json'
    });  
    return this.http.delete<any>(
      `${this.apiURL}/follow/${userId}`, 
      { headers } // Pass headers as options, not body
    ).pipe(
      tap(response => {
        console.log('Fetch delete Response:', response);
      }),
      catchError(error => {
        console.error('Error fetching user:', error);
        return throwError(error);
      })
    );
  }
}
