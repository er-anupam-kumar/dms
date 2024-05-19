import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface IRegistrations {
  company_name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  tax_registration_number: string;
  contact_person_name: string;
  contact_person_phone: number;
  contact_person_email: string;
  status: number;
  plan: string;
  payment_method: number;
  payment_remarks: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  postRegistrations(credentials: IRegistrations): Observable<any> {
    return this.http.post(`${environment.apiUrl}/registrations`, credentials);
  }

  getregistrations(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/registrations`);
  }

  editregistrations(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/registrations/${id}`);
  }

  updateRegistrations(id, registrations: IRegistrations): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/registrations/${id}`,
      registrations
    );
  }

  deleteregistrations(id) {
    return this.http.delete(`${environment.apiUrl}/registrations/${id}`);
  }
}
