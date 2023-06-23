import { Injectable } from '@angular/core';
import { Survey } from '../survey';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private urlEndPoint: string = "http://localhost:8080/surveygenerator/surveys";

  constructor(private http: HttpClient) { }

  createSurvey(survey: Survey): Observable<Survey>{
    const token = sessionStorage.getItem('ssnData'); // Obtener el token del localstorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Survey>(this.urlEndPoint + '/create', survey, { headers });
  }
}
