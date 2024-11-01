import { HttpClient, HttpHeaders } from '@angular/common/http'; // Ensure HttpClient is imported
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  
  private apiURL = 'http://localhost:8000'; // Your API URL

  constructor(private http: HttpClient) {}  // Inject HttpClient here

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
  
    console.log('Headers:', headers);
  
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
