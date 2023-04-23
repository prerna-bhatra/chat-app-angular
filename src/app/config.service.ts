import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IESignup } from './signup/signup';
import { IELogin } from './login/login';
import { IERoom } from './rooms/rooms';

import jwt_decode from 'jwt-decode';
import { parsedLocalAuth } from './config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  parsedTokenDetails: parsedLocalAuth = {
    access_token: '',
  };

  public isUserLoggedIn: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  getAccessToken() {
    const authDetails = localStorage.getItem('auth_chat') || '';
    if (authDetails.length > 1) {
      this.parsedTokenDetails = JSON.parse(authDetails);
      const { access_token } = this.parsedTokenDetails || {};

      return access_token;
    }
  }

  getAuthDetails(token: string) {
    try {
      const decodedToken = jwt_decode(token);
      return decodedToken;
    } catch (Error) {
      return null;
    }
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.getAccessToken()}`,
  });

  signup(SigupCredentials: IESignup): Observable<any> {
    return this.http.post(
      `http://localhost:3000/auth/signup`,
      SigupCredentials
    );
  }

  login(LoginCredentials: IELogin): Observable<any> {
    return this.http.post(`http://localhost:3000/auth/login`, LoginCredentials);
  }

  addRoom(roomPayload: IERoom): Observable<any> {
    return this.http.post(`http://localhost:3000/api/rooms`, roomPayload, {
      headers: this.headers,
    });
  }

  rooms(): Observable<any> {
    return this.http.get(`http://localhost:3000/api/rooms`, {
      headers: this.headers,
    });
  }

  getMessagesByRoomId(roomId: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/messages/${roomId}`, {
      headers: this.headers,
    });
  }
}
