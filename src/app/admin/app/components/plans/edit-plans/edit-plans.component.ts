import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { LayoutServiceService } from 'src/app/admin/layout/services/layout-service.service';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { PlansService } from 'src/app/services/plans/plans.service';

@Component({
  selector: 'app-edit-plans',
  templateUrl: './edit-plans.component.html',
  styleUrls: ['./edit-plans.component.scss'],
})
export class EditPlansComponent implements OnInit {
  @ViewChild('editPlanForm') editPlanForm: NgForm;
  buttonDisabled = false;
  public themeDarkClass: string;
  private ngUnsubscribe = new Subject();
  public name = [];
  public price = [];
  public status = [];
  public created_at = [];
  public description = [];
  public users = [];
  public storage = [];
  public id = [];

  constructor(
    private plansService: PlansService,
    private router: ActivatedRoute,
    private routing: Router,
    private toastr: ToastrService,
    private layoutServiceService: LayoutServiceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.plansService
      .editPlan(this.router.snapshot.params.id)
      .subscribe((res) => {
        this.id = res.plan.id;
        this.name = res.plan.name;
        this.price = res.plan.price;
        this.status = res.plan.status;
        this.created_at = res.plan.created_at;
        this.description = res.plan.description;
        this.storage = res.plan.storage;
        this.users = res.plan.users;
      });
  }

  editPlan(value: any) {
    this.buttonDisabled = true;
    this.plansService.getEditPlan(this.id, this.editPlanForm.value).subscribe(
      (res) => {
        this.toastr.success(res.message, undefined, {
          closeButton: true,
          positionClass: 'toast-bottom-center',
        });
        this.routing.navigate(['/admin/app/all-plans']);
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
