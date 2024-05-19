import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Iprofile {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  profileService(credentials: Iprofile): Observable<any> {
    return this.http.post(`${environment.apiUrl}/profile`, credentials);
  }

  // getprofileService(id): Observable<any> {
  //   return this.http.get(`${environment.apiUrl}/profile`);
  // }

  getprofileValue(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/profile`);
  }

  
// change-password
  changePasswordService(credentials: Iprofile): Observable<any> {
    return this.http.post(`${environment.apiUrl}/change-password`, credentials);
  }

}

