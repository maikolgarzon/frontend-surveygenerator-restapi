import { Component, OnInit } from '@angular/core';
import { Survey } from '../survey';
import { FormService } from './form.service';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { SurveyService } from '../survey.service';
import { Category } from '../category';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public newSurvey:Survey = new Survey();
  categories!: Category[];

  constructor(private formService : FormService, private surveyService: SurveyService, private router: Router){}
  
  ngOnInit(): void {
    this.getCategories();
  }

  public getCategories() {
    this.surveyService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        if (this.categories && this.categories.length > 0) {
          this.newSurvey.category = this.categories[0]; // Asignar el primer registro a una propiedad
        }
      }
    );
  }
  

  createSurvey(){
    this.formService.createSurvey(this.newSurvey).pipe(
      tap(() => {
        Swal.fire(
          'Survey "' + this.newSurvey.title + '", has been saved',
          'Your survey was saved successfully.',
          'success'
        ).then(() => {
          this.router.navigate(['/survey']);
        })
      }),
      catchError((e: any) => {
        alert(e.error.messageInfo);
        return throwError(() => e);
      })
    )
    .subscribe();
  }

  close(){
    this.router.navigate(['/survey']);
  }

}
