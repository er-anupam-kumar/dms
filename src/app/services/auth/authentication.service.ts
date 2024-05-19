import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LogService } from 'src/app/services/log/log.service';

export interface ISignInCredentials {
  email: string;
  password: string;
}

export interface IForgotPassword {
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private logs: LogService
  ) {}

  public viewArray: any = [];
  public modifyArray: any = [];

  loginUser(credentials: ISignInCredentials): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login`, credentials);
  }

  ForgotPassword(fpass: IForgotPassword): Observable<any> {
    return this.http.post(`${environment.apiUrl}/forgot-password`, fpass);
  }

  logoutUser() {
    this.logs.logsLogout({event: 'Logout'}).subscribe((res)=>{
      return this.clearEverything()
    },
    (err)=>{
      return this.clearEverything()
    });
  }

  clearEverything(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('permissions');
    localStorage.removeItem('folder_permissions');
    localStorage.removeItem('subscription');
    localStorage.removeItem('view');
    localStorage.removeItem('modify');
    this.router.navigate(['/login']);
    this.toastr.success('Logout Successful', undefined, {
      closeButton: true,
      positionClass: 'toast-bottom-center',
    });
  }

  getLoginPermissions(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/login`);
  }

  checkLoggedIn() {
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    if (user && user.user_type == 'Admin') {
      this.router.navigate(['/admin']);
    } else if (user && user.user_type == 'Client') {
      this.router.navigate(['/company']);
    }
  }

  loggedInUser() {
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    return user;
  }

  assignPermitted() {
    let _array = JSON.parse(localStorage.getItem('permissions'));
    if (_array.length > 0) {
      for (let index = 0; index < _array.length; index++) {
        let module = _array[index];
        if (module.view == '1') {
          this.viewArray.push(module.module_name);
        }
        if (module.modify == '1') {
          this.modifyArray.push(module.module_name);
        }
      }
    }
    return { viewArray: this.viewArray, modifyArray: this.modifyArray };
  }
}
