import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const API_URL = '/33520496/Yang/api/v1/users';

// HTTP options to specify content type as JSON.
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root' /// makes the service available throughout the application.
})
export class AuthService {
  // Holds the authentication state of the user.
  isAuthenticated = false
  constructor(private http: HttpClient, private router: Router) {}

  userLogin(username:string, password:string) {
    const body = {username, password}
    return this.http.post(API_URL + '/login', body, httpOptions)
  }

  userSignup(username:string, password:string, confirm_password:string){
    const body = {username, password, confirm_password}
    return this.http.post(API_URL + '/signup', body, httpOptions);
  }

  // Updates the authentication state of the user.
  updateIsAuthenticated(bool:boolean){
    this.isAuthenticated = bool
  }
  
  // Checks if the user is authenticated.
  isUserAuthenticated(){
    return this.isAuthenticated;
  };
}


