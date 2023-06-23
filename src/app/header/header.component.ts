import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string = '';
  isLogin: boolean = false;
  encryptedToken: any;

  ngOnInit() {
    this.encryptedToken = sessionStorage.getItem('ssnData'); // Obtener el token del localstorage
    const decodedToken: any = jwt_decode(this.encryptedToken); // Decodificar el token JWT
    this.isLogin = true;
    this.username = decodedToken.username;
    //console.log("usernameJwt:" + this.username);
    //console.log("messageJwt:" + decodedToken.message);
  }

  logout() {
    sessionStorage.removeItem('ssnData');
  }
}
