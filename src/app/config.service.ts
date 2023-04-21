import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IESignup } from './signup/signup';
import { IELogin } from './login/login';
import { IERoom } from './rooms/rooms';

import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  getAuthDetails(token: string) {
    try {
      console.log({ token });
      const decodedToken = jwt_decode(token);
      return decodedToken;
    } catch (Error) {
      return null;
    }
  }

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
    return this.http.post(`http://localhost:3000/api/rooms`, roomPayload);
  }

  rooms(): Observable<any> {
    return this.http.get(`http://localhost:3000/api/rooms`);
  }

  getMessagesByRoomId(roomId:string):Observable<any>{
    return this.http.get(`http://localhost:3000/api/messages/${roomId}`);
  }
}
