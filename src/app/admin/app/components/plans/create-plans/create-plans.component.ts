import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { LayoutServiceService } from 'src/app/admin/layout/services/layout-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { PlansService } from 'src/app/services/plans/plans.service';

@Component({
  selector: 'app-create-plans',
  templateUrl: './create-plans.component.html',
  styleUrls: ['./create-plans.component.scss'],
})
export class CreatePlansComponent implements OnInit {
  @ViewChild('createplanForm') createplanForm: NgForm;
  buttonDisabled = false;
  public status = '1';
  public themeDarkClass: string;
  private ngUnsubscribe = new Subject();
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private layoutServiceService: LayoutServiceService,
    private cdr: ChangeDetectorRef,
    private addOnService: PlansService
    ) {
    this.layoutServiceService.themeDarkClassChange
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((themeDarkClass) => {
      this.themeDarkClass = themeDarkClass;
    });
  }

  ngOnInit(): void {}

  planValue(value: any) {
    this.buttonDisabled = true;
    this.addOnService.plansService(this.createplanForm.value).subscribe(
      (res) => {
        this.toastr.success(res.message, undefined, {
          closeButton: true,
          positionClass: 'toast-bottom-center',
        });
        this.router.navigate(['/admin/app/all-plans']);
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
