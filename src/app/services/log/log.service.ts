import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(private http: HttpClient) {}

  log(data): Observable<any> {
    return this.http.get(`${environment.apiUrl}/logs?user_id=` + data);
  }

  logs(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/logs`);
  }

  // logsLogout(): Observable<any> {
  //   return this.http.get(`${environment.apiUrl}/logs?event=Logout`);
  // }

  logsLogout(logs:any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/logs`, logs);
  }

}
