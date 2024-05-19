import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Iplans {
  name: string;
  price: number;
  users: number;
  storage: number;
  description: string;
  status: number;
}


@Injectable({
  providedIn: 'root',
})
export class PlansService {
  constructor(private http: HttpClient) {}

  plansService(credentials: Iplans): Observable<any> {
    return this.http.post(`${environment.apiUrl}/plans`, credentials);
  }

  getPlans(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/plans`);
  }

  editPlan(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/plans/${id}`);
  }

  getEditPlan(id, plan: Iplans): Observable<any> {
    return this.http.put(`${environment.apiUrl}/plans/${id}`, plan);
  }

  deletePlan(id) {
    return this.http.delete(`${environment.apiUrl}/plans/${id}`);
  }
}
