import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor(private http: HttpClient) {}

  getInvoices(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/invoices`);
  }


  getviewInvoices(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/invoices/${id}`);
  }

  getCompanyInvoices(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/company/invoices`);
  }


  getCompanyViewInvoices(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/company/invoices/${id}`);
  }

}
