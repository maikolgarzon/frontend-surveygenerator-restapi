import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Survey, UserResponse } from './responsesurvey';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResponseSurveyService {

  private urlEndPoint: string = "http://localhost:8080/surveygenerator/surveys";

  constructor(private http:HttpClient) { }

  findSurveyByCodeSurvey(codeSurvey:string): Observable<Survey>{
    return this.http.get<Survey>(this.urlEndPoint + '/findbycodesurvey/'+ codeSurvey);
  }

  saveResponses(codeSurvey:string, responses:UserResponse):Observable<UserResponse>{
    return this.http.post<UserResponse>(this.urlEndPoint + '/surveyresponse/' + codeSurvey, responses);
  }
}
