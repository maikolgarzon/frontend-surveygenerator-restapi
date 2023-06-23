import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { JwtDto } from './jwtDto';
import { Router } from '@angular/router';
//import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlEndPoint: string = "http://localhost:8080/surveygenerator/auth";
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<string> {
    const body = { username, password };
    return this.http.post<JwtDto>(`${this.urlEndPoint}/login`, body)
      .pipe(map((response: JwtDto) => {
        const token = response.token;
        //const encryptedToken = CryptoJS.AES.encrypt(token, 'secret key').toString(); // cifra el token
        sessionStorage.setItem('ssnData', token);
        return token;
      }));
  }
}