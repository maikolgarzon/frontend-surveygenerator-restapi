import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseSurveyService } from './responsesurvey.service';
import { Option, Question, Survey, UserResponse } from './responsesurvey';
import { catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-responsesurvey',
  templateUrl: './responsesurvey.component.html',
  styleUrls: ['./responsesurvey.component.css']
})
export class ResponsesurveyComponent {
  codeSurvey: any;
  loadSurvey: Survey = new Survey();
  responseUser = new UserResponse();
  listOptions!:string[];

  //http://localhost:4200/surveyresponse/CSbh9g1kom

  constructor(private responseSurveyService : ResponseSurveyService ,private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.codeSurvey = this.route.snapshot.paramMap.get('codeSurvey');
    this.findSurveyByCodeSurvey();
  }

  findSurveyByCodeSurvey(){
    this.responseSurveyService.findSurveyByCodeSurvey(this.codeSurvey).subscribe(
      (data) => {
        this.loadSurvey = data;
      }
    );
  }

  updateSelectedOption(question: Question, selectedOption: Option) {
    question.options.forEach(option => {
      if (option !== selectedOption) {
        option.selectedOption = '';
      }
    });
  
    let selectedOptions: string[] = [];
  
    for (let question of this.loadSurvey.questions) {
      const selectedOption = question.options.find(option => option.selectedOption);
      if (selectedOption) {
        selectedOptions.push(selectedOption.selectedOption);
      }
    }
  
    this.listOptions = selectedOptions;
    console.log(JSON.stringify(this.listOptions));
  }
  
  saveResponses(){
    this.responseUser.codeOption = this.listOptions;
    //console.log(JSON.stringify(this.responseUser));
    this.responseSurveyService.saveResponses(this.codeSurvey, this.responseUser).pipe(
      tap(() => {
        Swal.fire(
          'Survey saved!!',
          'The survey has been successfully saved!!',
          'success'
        ).then(() => {
          this.router.navigate(['/']);
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
