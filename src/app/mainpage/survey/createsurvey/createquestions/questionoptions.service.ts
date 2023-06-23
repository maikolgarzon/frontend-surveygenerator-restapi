import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from './formsurvey';

@Injectable({
  providedIn: 'root'
})
export class QuestionoptionsService {
  private urlEndPoint: string = "http://localhost:8080/surveygenerator/surveys";

  constructor(private http: HttpClient) { }

  saveQuestions(questions: Question[], surveyId:any): Observable<Question[]> {
    const token = sessionStorage.getItem('ssnData'); // Obtener el token del localstorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Question[]>(this.urlEndPoint + '/create/surveyform/' + surveyId, questions, { headers } );
  }
}
