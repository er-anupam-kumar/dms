import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface payValue {
  type: string;
  reference_id: string;
  gateway: string;
  razorpay_payment_id: string;
  amount: number;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  getTransactions(credentials: payValue): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/company/transactions`,
      credentials
    );
  }
}
