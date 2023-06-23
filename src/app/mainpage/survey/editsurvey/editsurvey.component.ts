import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditsurveyService } from './editsurvey.service';
import { EditSurvey, Option } from './editsurvey';
import { Question } from './editsurvey';
import Swal from 'sweetalert2';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-editsurvey',
  templateUrl: './editsurvey.component.html',
  styleUrls: ['./editsurvey.component.css']
})

export class EditsurveyComponent implements OnInit{
  surveyId:any;
  loadSurvey:EditSurvey = new EditSurvey();
  lastIndexId!: number;

  constructor(private editSurveyService : EditsurveyService, private router: Router,private route: ActivatedRoute){}

  ngOnInit(): void {
    this.surveyId = this.route.snapshot.paramMap.get('idSurvey');
    this.findSurveyById();
  }

  findSurveyById(){
    this.editSurveyService.findByid(this.surveyId).subscribe(
      (data) => this.loadSurvey = data,
    );
  }

  addQuestion() {
    this.lastIndexId = this.loadSurvey.questions[this.loadSurvey.questions.length - 1]?.id;
    const newQuestion: Question = { id: ++this.lastIndexId, description: '', options: [] };
    this.loadSurvey.questions.push(newQuestion);
  }

  addOption(question: Question) {
    const newOption = { id: question.options.length + 1, description: '' };
    question.options.push(newOption);
  }

  removeQuestion(index: number) {
    this.loadSurvey.questions.splice(index, 1);
  }

  removeOption(question: { options: any[]; }, index: any) {
    question.options.splice(index, 1);
  }

  editSurvey() {
    //const options: Option[] = this.loadSurvey.questions.flatMap(question => question.options);
    //console.log("questions_list: " + JSON.stringify(options));      
    //this.editSurveyService.delete_Questions_Options(this.surveyId, questions).subscribe();
    this.editSurveyService.editSurvey(this.surveyId, this.loadSurvey).pipe(
      tap(() => {
        Swal.fire(
          'the changes has been saved',
          'Your survey was update sucessfully.',
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
    console.log("questions_list: " + JSON.stringify(this.loadSurvey));
    this.editSurveyService.delete_Questions_Options(this.surveyId, this.loadSurvey.questions).subscribe();  
  }

  close(){
    this.router.navigate(['/survey']);
  }
}
