import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';

import { Observable, map, tap } from 'rxjs';
import { Profile } from './profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private urlEndPoint: string = "http://localhost:8080/surveygenerator/userdata";
  
  //no es necesario ya que angular infiere el tipo de contenido para cada solicitud
  //private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getCurrentProfile(): Observable<Profile> {
    const token = sessionStorage.getItem('ssnData'); // Obtener el token del localstorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Profile>(this.urlEndPoint + '/profile', { headers });
  }

  editProfile(profile: Profile): Observable<Profile> {
    const token = sessionStorage.getItem('ssnData'); // Obtener el token del localstorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<Profile>(`${this.urlEndPoint}/edit`, profile, { headers });
  }

  uploadPhoto(photo: File): Observable<HttpEvent<{}>> {
    const token = sessionStorage.getItem('ssnData'); // Obtener el token del localstorage
    const newHeaders = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const options = {
      headers: newHeaders,
      reportProgress: true
    };

    let formData = new FormData();
    console.log("service_photo = " + photo.name)
    formData.append("photo", photo);
    const response: any = new HttpRequest('PUT', `${this.urlEndPoint}/photo`, formData, options);

    return this.http.request(response);
  }
}
