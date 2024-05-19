import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('forgotPasswordForm') forgotPasswordForm: NgForm;
  status: boolean = false;
  title = environment.title;

  constructor(
    private toastr: ToastrService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authService.checkLoggedIn();
  }

  clickEvent() {
    this.status = !this.status;
  }

  forgotPasswordValue(value: any) {
    this.authService.ForgotPassword(this.forgotPasswordForm.value).subscribe(
      (res) => {
        this.toastr.success(res.message, undefined, {
          closeButton: true,
          positionClass: 'toast-bottom-center',
        });
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
  }
}
