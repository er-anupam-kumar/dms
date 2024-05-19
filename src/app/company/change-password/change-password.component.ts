import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('changePasswordForm') changePasswordForm: NgForm;
  buttonDisabled = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {}

  changePasswordValue(value: any) {
    if (value.old_password == value.new_password) {
      this.toastr.error(
        'The new password is similar to old password',
        undefined,
        {
          closeButton: true,
          positionClass: 'toast-bottom-center',
        }
      );
      return false;
    } else if (value.new_password != value.confirm_password) {
      this.toastr.error(
        'The new password and confirm password are not similar',
        undefined,
        {
          closeButton: true,
          positionClass: 'toast-bottom-center',
        }
      );
      return false;
    } else {
      this.buttonDisabled = true;
      this.profileService
        .changePasswordService(this.changePasswordForm.value)
        .subscribe(
          (res) => {
            this.toastr.success(res.message, undefined, {
              closeButton: true,
              positionClass: 'toast-bottom-center',
            });
            this.router.navigate(['login']);
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
}
