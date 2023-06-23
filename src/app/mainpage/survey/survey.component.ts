import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Category } from './category';
import { Survey } from './survey';
import { SurveyService } from './survey.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})

export class SurveyComponent implements OnInit {
  public categories!: Category[];
  public actualCategory: number = 5;
  subtitle!:string;
  surveys: Survey[] = [];
  public questions!: string[];
  currentPage = 1;

  constructor(private surveyService: SurveyService, private clipboard: Clipboard,
    private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getCategories();
    this.getSurveys(this.actualCategory);
  }

  public getCategories() {
    this.surveyService.getCategories().subscribe(
      (data) => this.categories = data
    );
  }

  public getSurveys(category: number) {
    this.surveyService.getSurveys(category).subscribe(
      (data) => this.surveys = data
    );
  }

  public copyLink(codeSurvey: string) {
    this.clipboard.copy('http://localhost:4200/surveyresponse/' + codeSurvey);
    alert('link copied!!');
    this.router.navigate(['/survey']);
  }

  public deleteSurvey(idSurvey: number) {
    Swal.fire({
      title: 'Delete Survey',
      text: 'Are you sure you want to delete the survey?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.surveyService.deleteSurvey(idSurvey).pipe(
          tap(() => {
            Swal.fire(
              'Survey has been deleted.',
              'The survey was deleted successfully.',
              'success'
            ).then(() => {
              location.reload();
            });
          }),
          catchError((e: any) => {
            alert(e.error.messageInfo);
            return throwError(() => e);
          })
        ).subscribe();
      }
    });
  }


}
