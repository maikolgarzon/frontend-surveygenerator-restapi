import { Component, HostBinding } from '@angular/core';
import { OnInit } from '@angular/core';
import { Suggestion } from './suggestion';
import { MainpageService } from './mainpage.service';
import { catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})

export class MainpageComponent {
  suggestion: Suggestion = new Suggestion();

  constructor(private mainPageService: MainpageService, private router: Router) { }

  public saveSuggestion() {
    this.mainPageService.saveSuggestion(this.suggestion).pipe(
      tap(() => {
        Swal.fire(
          'Suggestion has been saved',
          'Your suggestion was saved successfully.',
          'success'
        ).then(() => {
          window.location.reload();
        })
      }),
      catchError((e: any) => {
        alert(e.error.messageInfo);
        return throwError(() => e);
      })
    )
      .subscribe();
  }
}

