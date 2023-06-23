import { Injectable } from '@angular/core';
import { Category } from './category';
import { Survey } from './survey';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private urlEndPoint: string = "http://localhost:8080/surveygenerator/surveys";

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]>{
    const token = sessionStorage.getItem('ssnData'); // Obtener el token del localstorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Category[]>(this.urlEndPoint + '/categories', { headers });
  }

  getSurveys(idCategory:number): Observable<Survey[]>{
    const token = sessionStorage.getItem('ssnData'); // Obtener el token del localstorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Survey[]>(this.urlEndPoint + '/findbycategory/' + idCategory, { headers });
  }

  deleteSurvey(surveyId:number): Observable<Survey>{
    const token = sessionStorage.getItem('ssnData'); // Obtener el token del localstorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<Survey>(this.urlEndPoint + '/delete/' + surveyId, { headers });
  }
}
