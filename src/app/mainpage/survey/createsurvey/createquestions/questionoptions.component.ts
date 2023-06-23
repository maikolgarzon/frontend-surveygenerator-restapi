import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionoptionsService } from './questionoptions.service';
import { Question } from './formsurvey';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-questionoptions',
  templateUrl: './questionoptions.component.html',
  styleUrls: ['./questionoptions.component.css']
})
export class QuestionoptionsComponent implements OnInit {
  questions: Question[] = [];
  questionCount = 0;
  surveyId: any = 0;

  constructor(private apiService: QuestionoptionsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.surveyId = this.route.snapshot.paramMap.get('idSurvey');
  }

  addQuestion() {
    const newQuestion: Question = { id: ++this.questionCount, description: '', options: [] };
    this.questions.push(newQuestion);
  }

  addOption(question: Question) {
    const newOption = { id: question.options.length + 1, description: '' };
    question.options.push(newOption);
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  removeOption(question: { options: any[]; }, index: any) {
    question.options.splice(index, 1);
  }

  atLeastOneOptionSelected(): boolean {
    for (let question of this.questions) {
      if (question.options.length > 0) {
        return true;
      }
    }
    return false;
  }

  saveAll() {
    console.log("questions_list: " + JSON.stringify(this.questions))
    this.apiService.saveQuestions(this.questions, this.surveyId).subscribe(
      () => {
        Swal.fire(
          'Questions and option form was saved',
          'Your questions and option was saved successfully.',
          'success'
        ).then(() => {
          this.router.navigate(['/survey']);
        })
      });
  }

  close() {
    this.router.navigate(['/survey']);
  }
}
