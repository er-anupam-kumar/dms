import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentsService } from 'src/app/services/departments/departments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-departments',
  templateUrl: './edit-departments.component.html',
  styleUrls: ['./edit-departments.component.scss'],
})
export class EditDepartmentsComponent implements OnInit {
  @ViewChild('updateDepartmentsForm') updateDepartmentsForm: NgForm;
  buttonDisabled = false;
  public status = '';
  public unique_id = '';
  public name = '';

  constructor(
    private departmentsService: DepartmentsService,
    private router: ActivatedRoute,
    private routing: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCompanyDepartments();
  }

  getCompanyDepartments() {
    this.departmentsService
      .geteditCompanydepartments(this.router.snapshot.params.id)
      .subscribe((res) => {
        this.name = res.department.name;
        this.unique_id = res.department.unique_id;
        this.status = res.department.status;
      });
  }

  updateDepartments(value: any) {
    this.buttonDisabled = true;
    this.departmentsService
      .updateCompanydepartments(
        this.router.snapshot.params.id,
        this.updateDepartmentsForm.value
      )
      .subscribe(
        (res) => {
          this.toastr.success(res.message, undefined, {
            closeButton: true,
            positionClass: 'toast-bottom-center',
          });
          this.routing.navigate(['/company/departments']);
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
