import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { LayoutServiceService } from 'src/app/admin/layout/services/layout-service.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;
  buttonDisabled = false;
  title = environment.title;

  public themeDarkClass: string;
  private ngUnsubscribe = new Subject();

  loginUserData = {};

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private sharedDataService: SharedService,
    private layoutServiceService: LayoutServiceService,
    private cdr: ChangeDetectorRef,
    private authService: AuthenticationService
    ) {
    this.layoutServiceService.themeDarkClassChange
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((themeDarkClass) => {
      this.themeDarkClass = themeDarkClass;
    });
  }

  ngOnInit(): void {
    this.authService.checkLoggedIn()
  }

  loginUserValue(value: any) {
    this.buttonDisabled = true;
    this.authService.loginUser(this.loginForm.value).subscribe(
      (res) => {
        if (res.token) {
          this.toastr.success(res.message, undefined, {
            closeButton: true,
            positionClass: 'toast-bottom-center',
          });
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          if (res.user.user_type == 'Admin') {
            localStorage.setItem('permissions', JSON.stringify(res.permissions));
            this.router.navigate(['/admin']);
          } else {
            localStorage.setItem('subscription',JSON.stringify(res.subscription));

            if(res.user.is_admin=='Yes'){
              this.sharedDataService.changeData({
                modify: 'Yes',
                view: 'Yes'
              });
            }
            
            if (res.subscription?.status == '0') {
              this.router.navigate(['/company/payments'], {
                state: { id: res.subscription.plan_id, type: 'plan' },
              });
            } else {
              this.router.navigate(['/company']);
            }

          }
        }
      },
      (err) => {
        var message = err.error.message;
        if (
          err.error.errors &&
          err.error.errors[Object.keys(err.error.errors)[0]] &&
          err.error.errors[Object.keys(err.error.errors)[0]][0]
          ) {
          message = err.error.errors[Object.keys(err.error.errors)[0]][0];
      }
      this.toastr.error(message, undefined, {
        closeButton: true,
        positionClass: 'toast-bottom-center',
      });
    }
    );
    this.buttonDisabled = false;
  }
}
