import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AddOnService } from 'src/app/services/add-ons/add-on.service';

@Component({
  selector: 'app-create-add-ons',
  templateUrl: './create-add-ons.component.html',
  styleUrls: ['./create-add-ons.component.scss'],
})
export class CreateAddOnsComponent implements OnInit {
  @ViewChild('createAddonForm') createAddonForm: NgForm;
  buttonDisabled = false;
  public status: string = '1';
  public addontype: string = '0';
  public themeDarkClass: string;
  private ngUnsubscribe = new Subject();

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private addOnService: AddOnService
    ) {}

  ngOnInit(): void {}

  addonUserValue(value: any) {
    this.buttonDisabled = true;
    this.addOnService.addonUser(this.createAddonForm.value).subscribe(
      (res) => {
        this.toastr.success(res.message, undefined, {
          closeButton: true,
          positionClass: 'toast-bottom-center',
        });
        this.router.navigate(['/admin/app/all-add-ons']);
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
