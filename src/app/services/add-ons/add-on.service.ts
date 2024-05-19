import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface IaddAddon {
  name: string;
  price: string;
  type: number;
  typevalue: number;
  description: string;
  status: number;
}

@Injectable({
  providedIn: 'root',
})
export class AddOnService {
  constructor(private http: HttpClient) {}

  addonUser(credentials: IaddAddon): Observable<any> {
    return this.http.post(`${environment.apiUrl}/addons`, credentials);
  }

  getAddon(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/addons`);
  }

  deleteAddon(id) {
    return this.http.delete(`${environment.apiUrl}/addons/${id}`);
  }

  editAddon(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/addons/${id}`);
  }

  getEditAddon(id, addon: IaddAddon): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/addons/${id}`, addon);
  }


}
