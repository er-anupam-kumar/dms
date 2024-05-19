import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class CompanyDashboardService {
  constructor(private http: HttpClient) {}

  getCompanyDashboard(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/company/dashboard`);
  }
}
