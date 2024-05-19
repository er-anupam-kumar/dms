import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Iuser {
  name: string;
  phone: number;
  email: string;
  status: string;
  address: string;
  modify: [];
  view: [];
}
export interface ICompanyUser {
  department: number;
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  address: string;
  status: number;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getModule(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/modules`);
  }

  createUsersFormValue(credentials: Iuser): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users`, credentials);
  }

  geteAllUsersvalue(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users`);
  }

  deleteUser(id): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }

  geteditUser(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/${id}`);
  }

  updateEditUser(id, user: Iuser): Observable<any> {
    return this.http.put(`${environment.apiUrl}/users/${id}`, user);
  }

  // company service

  postCompanyUser(credentials: ICompanyUser): Observable<any> {
    return this.http.post(`${environment.apiUrl}/company/users`, credentials);
  }

  getecompanyUsersData(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/company/users`);
  }

  getCompanyApprovalsUsers(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/company/users?file_id=`+id);
  }


  deleteCompanyUser(id): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/company/users/${id}`);
  }

  geteditCompanyUser(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/company/users/${id}`);
  }

  updateCompanyUser(id, user: ICompanyUser): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/company/users/${id}`, user);
  }
}
