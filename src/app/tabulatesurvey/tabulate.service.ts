import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from './tabulate';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TabulateService {

  constructor(private http:HttpClient) { }

  private urlEndPoint: string = "http://localhost:8080/surveygenerator/surveys/tabulate/";

  getQuestions(codeSurvey:string | null):Observable<Question[]>{
    const token = sessionStorage.getItem('ssnData'); // Obtener el token del localstorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Question[]>(this.urlEndPoint + codeSurvey, {headers})
  }
}
