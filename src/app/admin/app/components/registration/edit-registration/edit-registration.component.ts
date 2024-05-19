import { Component, OnInit, ViewChild } from '@angular/core';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PlansService } from 'src/app/services/plans/plans.service';

@Component({
  selector: 'app-edit-registration',
  templateUrl: './edit-registration.component.html',
  styleUrls: ['./edit-registration.component.scss'],
})
export class EditRegistrationComponent implements OnInit {
  @ViewChild('updateRegistrationForm') updateRegistrationForm: NgForm;
  buttonDisabled = false;
  public id = '';
  public company_name = '';
  public company_address = '';
  public company_city = '';
  public company_state = '';
  public company_country = '';
  public tax_registration_number = '';
  public contact_person_name = '';
  public contact_person_phone: string = '';
  public contact_person_email = '';
  public plan_id = '';
  public payment_method = '';
  public payment_remarks = '';
  public status = '';
  public rows = [];

  constructor(
    private registration: RegistrationService,
    private router: ActivatedRoute,
    private routing: Router,
    private toastr: ToastrService,
    private plansService: PlansService
  ) {}

  ngOnInit(): void {
    this.getPlanData();
    this.getregistrationData();
  }

  getPlanData() {
    this.plansService.getPlans().subscribe((data) => {
      this.rows = data.plans;
    });
  }

  getregistrationData() {
    this.registration
      .editregistrations(this.router.snapshot.params.id)
      .subscribe((res) => {
        this.company_name = res.registration.company.name;
        this.company_address = res.registration.company.address;
        this.company_city = res.registration.company.city;
        this.company_state = res.registration.company.state;
        this.company_country = res.registration.company.country;
        this.tax_registration_number = res.registration.company.tin;
        this.plan_id = res.registration.subscription.plan_id;
        this.payment_method = res.registration.subscription.payment_method;
        this.payment_remarks = res.registration.subscription.payment_remarks;
        this.contact_person_name = res.registration.user.name;
        this.contact_person_phone = res.registration.user.phone;
        this.contact_person_email = res.registration.user.email;
        this.status = res.registration.user.status;
      });
  }
  updateRegistrationValue(value: any) {
    this.buttonDisabled = true;
    this.registration
      .updateRegistrations(
        this.router.snapshot.params.id,
        this.updateRegistrationForm.value
      )
      .subscribe(
        (res) => {
          this.toastr.success(res.message, undefined, {
            closeButton: true,
            positionClass: 'toast-bottom-center',
          });
          this.routing.navigate(['/admin/app/all-registration']);
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
