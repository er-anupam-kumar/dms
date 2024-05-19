import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PlansService } from 'src/app/services/plans/plans.service';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss'],
})
export class CreateRegistrationComponent implements OnInit {
  @ViewChild('registrationForm') registrationForm: NgForm;
  buttonDisabled = false;
  public rows = [];
  public payment_method: string = '0';
  public statusUser: string = '1';

  constructor(
    private registration: RegistrationService,
    private router: Router,
    private toastr: ToastrService,
    private plansService: PlansService
  ) {}

  ngOnInit(): void {
    this.getPlanData();
  }

  getPlanData() {
    this.plansService.getPlans().subscribe((data) => {
      this.rows = data.plans;
    });
  }

  registrationValue(value: any) {
    this.buttonDisabled = true;
    this.registration.postRegistrations(this.registrationForm.value).subscribe(
      (res) => {
        this.toastr.success(res.message, undefined, {
          closeButton: true,
          positionClass: 'toast-bottom-center',
        });
        this.router.navigate(['/admin/app/all-registration']);
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
