import { Injectable } from '@angular/core';
import { NewUser } from './newUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class CreateuserService {
  private urlEndPoint: string = "http://localhost:8080/surveygenerator/auth";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient) { }

  createUser(user:NewUser): Observable<NewUser>{
       return this.http.post<NewUser>(`${this.urlEndPoint}/register`, user);
  }
}

