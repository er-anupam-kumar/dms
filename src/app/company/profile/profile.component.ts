import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('profileForm') profileForm: NgForm;
  buttonDisabled = false;
  public status: string = '1';
  public addontype: string = '0';
  public name = '';
  public email = '';
  public phone = '';
  public address = '';
  public city = '';
  public state = '';
  public country = '';
  public tax_registration_no = '';
  public company_name = '';
  public isAdmin: string;

  constructor(
    private toastr: ToastrService,
    private profileService: ProfileService,
    private aRoute: ActivatedRoute,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getPlanData();
    let user = this.authService.loggedInUser();
    this.isAdmin = user.is_admin;
  }

  updateProfileValue(value: any) {
    this.buttonDisabled = true;
    this.profileService.profileService(this.profileForm.value).subscribe(
      (res) => {
        this.toastr.success(res.message, undefined, {
          closeButton: true,
          positionClass: 'toast-bottom-center',
        });
        this.ngOnInit();
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

  getPlanData() {
    this.profileService.getprofileValue().subscribe((data) => {
      this.name = data.user.name;
      this.email = data.user.email;
      this.phone = data.user.phone;
      this.address = data.user.address;
      this.city = data.user.city;
      this.state = data.user.state;
      this.country = data.user.country;
      this.company_name = data.user.company_name;
      this.tax_registration_no = data.user.tax_registration_no;
    });
  }
}
