import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Suggestion } from './suggestion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainpageService {
  private urlEndPoint: string = "http://localhost:8080/surveygenerator/surveys/suggestion";

  constructor(private http:HttpClient) { }

  public saveSuggestion(suggestion:Suggestion): Observable<Suggestion>{
    return this.http.post<Suggestion>(this.urlEndPoint, suggestion);
  }
}
