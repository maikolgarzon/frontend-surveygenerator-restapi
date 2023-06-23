import { Component } from '@angular/core';
import { NewUser } from './newUser';
import { CreateuserService } from './createuser.service';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent {
  public nUser: NewUser = new NewUser();
  confirmPassword!: string;

  constructor(private userService: CreateuserService, private router:Router) { }

  createUser(): void {
    if (this.nUser.password !== this.confirmPassword) {
      Swal.fire(
        'Register fails',
        'Passwords do not match.',
        'error'
      );
      return;
    }
  
    console.log(this.nUser);
    this.userService.createUser(this.nUser).pipe(
      catchError((e: any) => {
        Swal.fire(
          'Register fails',
          e.error.messageInfo,
          'error'
        ).then(() => {
          this.router.navigate(['/register']);
        });
        return throwError(() => e);
      })
    ).subscribe(() => {
      Swal.fire(
        'User created',
        'Your user has been created successfully, please log in with the data you provided.',
        'success'
      ).then(() => {
        this.router.navigate(['/login']);
      });
    });
  }
  
}
