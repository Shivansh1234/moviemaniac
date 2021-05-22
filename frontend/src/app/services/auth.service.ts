import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: User | undefined;

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<any> {
    return this.http.post(`${environment.baseURL}/users/register`, user);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(`${environment.baseURL}/users/update`, user);
  }

  authenticateUser(user: User): Observable<any> {
    return this.http.post(`${environment.baseURL}/users/authenticate`, user);
  }

  getProfile(): Observable<User> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // tslint:disable-next-line:object-literal-key-quotes
      'Authorization': this.authToken
    });
    return this.http.get(`${environment.baseURL}/users/profile`, { headers });
  }

  storeUserData(token: string, user: User): void {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(): void {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('id_token');
    if (token === null) {
      return false;
    }
    else {
      return true;
    }
  }

  logoutUser(): void {
    this.authToken = null;
    this.user = undefined;
    localStorage.clear();
  }

  // delete profile
  deleteUserProfile(id: any): Observable<any> {
    return this.http.delete(`${environment.baseURL}/users/profile/` + id);
  }
}