import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { LayoutServiceService } from 'src/app/admin/layout/services/layout-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AddOnService } from 'src/app/services/add-ons/add-on.service';

@Component({
  selector: 'app-edit-add-ons',
  templateUrl: './edit-add-ons.component.html',
  styleUrls: ['./edit-add-ons.component.scss'],
})
export class EditAddOnsComponent implements OnInit {
  @ViewChild('createAddonForm') createAddonForm: NgForm;
  buttonDisabled = false;
  public themeDarkClass: string;
  private ngUnsubscribe = new Subject();
  public id: number;
  public name = [];
  public price = [];
  public status = [];
  public created_at = [];
  public description = [];
  public type = [];
  public value = [];

  constructor(
    private addOnService: AddOnService,
    private router: ActivatedRoute,
    private routing: Router,
    private toastr: ToastrService,
    private layoutServiceService: LayoutServiceService,
    private cdr: ChangeDetectorRef
  ) {
    this.layoutServiceService.themeDarkClassChange
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((themeDarkClass) => {
        this.themeDarkClass = themeDarkClass;
      });
  }

  ngOnInit(): void {
    this.addOnService
      .editAddon(this.router.snapshot.params.id)
      .subscribe((res) => {
        this.name = res.addon.name;
        this.id = res.addon.id;
        this.price = res.addon.price;
        this.status = res.addon.status;
        this.created_at = res.addon.created_at;
        this.description = res.addon.description;
        this.type = res.addon.type;
        this.value = res.addon.value;
      });
  }

  addonUserValue(value: any) {
    this.buttonDisabled = true;
    this.addOnService
      .getEditAddon(this.id, this.createAddonForm.value)
      .subscribe(
        (res) => {
          this.toastr.success(res.message, undefined, {
            closeButton: true,
            positionClass: 'toast-bottom-center',
          });
          this.routing.navigate(['/admin/app/all-add-ons']);
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
