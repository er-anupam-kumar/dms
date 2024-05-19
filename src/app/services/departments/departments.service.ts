import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface ICompanydepartments {
  code: number;
  name: string;
  status: number;
}
@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  constructor(private http: HttpClient) {}

  postCompanydepartments(credentials: ICompanydepartments): Observable<any> {
    return this.http.post(`${environment.apiUrl}/company/departments`, credentials);
  }

  getecompanydepartmentssData(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/company/departments`);
  }

  deleteCompanydepartments(id): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/company/departments/${id}`);
  }

  geteditCompanydepartments(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/company/departments/${id}`);
  }

  updateCompanydepartments(id, departments: ICompanydepartments): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/company/departments/${id}`, departments);
  }
}
