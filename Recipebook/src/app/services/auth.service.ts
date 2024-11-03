import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    authUrl="http://localhost:8000/api/auth"

  constructor(private _http:HttpClient) { 
    this.isLoggedIn = !!localStorage.getItem('JWT_Token');
  }

  isLoggedIn: boolean = false;

  // loginUser(data:any):Observable<any>{
  //   return this._http.post<any>(`${this.authUrl}/login`,data);
  // }

  registerUser(data:any):Observable<any>{
    return this._http.post<any>(`${this.authUrl}/register`,data);
  }

  loginUser(data: any): Observable<boolean> {
    return this._http.post<any>(`${this.authUrl}/login`, data)
      .pipe(
        map(response => {
          console.log('API Response:', response); // Log the entire response
          if (response.accessToken) { // Check if the token exists in the response
            localStorage.setItem('JWT_Token', response.accessToken);
            this.isLoggedIn = true;
            return true;
          }
          return false; // Return false if token is not present
        }),
        catchError(error => {
          console.log(error);
          this.isLoggedIn = false;
          return of(false);
        })
      );
  }
  

  logout(): void {
    localStorage.removeItem('JWT_Token');
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('JWT_Token');
  }



}
