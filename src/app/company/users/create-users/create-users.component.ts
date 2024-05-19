import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users/users.service';
import { DepartmentsService } from 'src/app/services/departments/departments.service';
import { CLS_RM_WHITE_SPACE } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss'],
})
export class CreateUsersComponent implements OnInit {
  @ViewChild('createuserForm') createuserForm: NgForm;

  public status: string = '1';
  buttonDisabled = false;
  rows = [];
  departments: any = [];
  departmentIds: any = [];
  public viewArray: any = [];
  public modifyArray: any = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private usersService: UsersService,
    private departmentsService: DepartmentsService
  ) {}

  ngOnInit(): void {
    this.getdepartments();
  }

  getdepartments() {
    this.departmentsService.getecompanydepartmentssData().subscribe((data) => {
      this.rows = data.departments;
    });
  }

  createuser(value: any) {
    this.buttonDisabled = true;
    if (
      (this.modifyArray.length == 0 && this.viewArray.length == 0) ||
      this.departments.length == 0
    ) {
      this.toastr.error(
        'Department or Department permissions is required',
        undefined,
        {
          closeButton: true,
          positionClass: 'toast-bottom-center',
        }
      );
      this.buttonDisabled = false;
      return false;
    }
    this.createuserForm.value.modify = this.modifyArray;
    this.createuserForm.value.view = this.viewArray;
    this.usersService.postCompanyUser(this.createuserForm.value).subscribe(
      (res) => {
        this.toastr.success(res.message, undefined, {
          closeButton: true,
          positionClass: 'toast-bottom-center',
        });
        this.router.navigate(['/company/users']);
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

  saveView(e) {
    if (e.target.checked) {
      this.viewArray.push(e.target.value);
    } else {
      this.viewArray = this.viewArray.filter((x) => {
        return x != e.target.value;
      });
    }
  }

  saveModify(e) {
    if (e.target.checked) {
      this.modifyArray.push(e.target.value);
    } else {
      this.modifyArray = this.modifyArray.filter((x) => {
        return x != e.target.value;
      });
    }
  }

  departmentSave(id: any, name: string) {
    if (!this.departmentIds.includes(id)) {
      this.departmentIds.push(id);
      this.departments.push({
        id,
        name,
      });
    } else {
      this.departmentIds = this.departmentIds.filter((x) => x != id);
      this.departments = this.departments.filter((x) => x.id != id);
      this.modifyArray = this.modifyArray.filter((x) => {
        return x != id;
      });
      this.viewArray = this.viewArray.filter((x) => {
        return x != id;
      });
    }
  }
}
