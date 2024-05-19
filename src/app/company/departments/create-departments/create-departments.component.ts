import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentsService } from 'src/app/services/departments/departments.service';

@Component({
  selector: 'app-create-departments',
  templateUrl: './create-departments.component.html',
  styleUrls: ['./create-departments.component.scss'],
})
export class CreateDepartmentsComponent implements OnInit {
  @ViewChild('createdepartmentsForm') createdepartmentsForm: NgForm;
  buttonDisabled = false;
  status = '1';
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private departmentsService: DepartmentsService
  ) {}

  ngOnInit(): void {}

  createdepartments(value: any) {
    this.buttonDisabled = true;
    this.departmentsService
      .postCompanydepartments(this.createdepartmentsForm.value)
      .subscribe(
        (res) => {
          this.toastr.success(res.message, undefined, {
            closeButton: true,
            positionClass: 'toast-bottom-center',
          });
          this.router.navigate(['/company/departments']);
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
