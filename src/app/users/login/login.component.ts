import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private loginService: LoginService, private router: Router) { }

  loginUser(): void {
    this.loginService.login(this.username, this.password)
      .pipe(
        tap((token: any) => {
          //console.log('Token:', token);
          //alert('token: ' + token);
          this.router.navigate(['/survey']);
        }),

        catchError((e: any) => {
          alert(e.error.messageInfo);
          return throwError(() => e);
        })
      )
      .subscribe();
  }
}