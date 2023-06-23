import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EditSurvey, Question } from './editsurvey';

@Injectable({
  providedIn: 'root'
})
export class EditsurveyService {
  private urlEndPoint: string = "http://localhost:8080/surveygenerator/surveys";

  constructor(private http:HttpClient) { }

  findByid(surveyId:number): Observable<EditSurvey>{
    const token = sessionStorage.getItem('ssnData'); // Obtener el token del localstorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<EditSurvey>(this.urlEndPoint + '/findbyid/' + surveyId, { headers });
  }

  editSurvey(surveyId:number, survey:EditSurvey): Observable<EditSurvey>{
    const token = sessionStorage.getItem('ssnData'); // Obtener el token del localstorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<EditSurvey>(this.urlEndPoint + '/edit/' + surveyId, survey, { headers });
  }

  delete_Questions_Options(surveyId: number, qs:Question[]): Observable<EditSurvey> {
    const token = sessionStorage.getItem('ssnData'); // Obtener el token del localstorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const options = {
      headers,
      body: qs // Especificar el objeto survey como cuerpo de la solicitud
    };
  
    return this.http.request<EditSurvey>('DELETE', this.urlEndPoint + '/delete_Questions_Options/' + surveyId, options);
  }
  
}
