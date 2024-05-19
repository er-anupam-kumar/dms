import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepartmentsService } from 'src/app/services/departments/departments.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss'],
})
export class EditUsersComponent implements OnInit {
  @ViewChild('UpdateuserForm') UpdateuserForm: NgForm;
  buttonDisabled = false;
  public department_id = '';
  public name = '';
  public email = '';
  public phone = '';
  public address = '';
  public city = '';
  public country = '';
  public state = '';
  public status = '';
  public rows = '';
  public department = '';
  departmentId: number;
  public viewArray: any = [];
  public modifyArray: any = [];
  public folder_permissions: any = [];
  public departments: any = [];
  public departmentIds: any = [];

  constructor(
    private usersService: UsersService,
    private router: ActivatedRoute,
    private routing: Router,
    private toastr: ToastrService,
    private departmentsService: DepartmentsService
  ) {}

  ngOnInit(): void {
    this.getCompanyUser();
    this.getdepartments();
  }

  getdepartments() {
    this.departmentsService.getecompanydepartmentssData().subscribe((data) => {
      this.rows = data.departments;
    });
  }

  getCompanyUser = () => {
    this.usersService
      .geteditCompanyUser(this.router.snapshot.params.id)
      .subscribe((res) => {
        this.name = res.user.name;
        this.email = res.user.email;
        this.phone = res.user.phone;
        this.address = res.user.address;
        this.city = res.user.city;
        this.state = res.user.state;
        this.country = res.user.country;
        this.status = res.user.status;
        this.folder_permissions = res.folder_permissions;

        for (let i = 0; res.folder_permissions.length >= i; i++) {
          if (res.folder_permissions[i]?.department_id) {
            let item = {
              id: res.folder_permissions[i]?.department_id,
              name: res.folder_permissions[i]?.department_name,
            };
            this.departments.push(item);
            this.departmentIds.push(item.id);
          }
          if (res.folder_permissions[i]?.view) {
            this.viewArray.push(res.folder_permissions[i]?.department_id);
          }
          if (res.folder_permissions[i]?.modify) {
            this.modifyArray.push(res.folder_permissions[i]?.department_id);
          }
        }
      });
  };

  Updateuser(value: any) {
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
    this.UpdateuserForm.value.modify = this.modifyArray;
    this.UpdateuserForm.value.view = this.viewArray;
    this.usersService
      .updateCompanyUser(
        this.router.snapshot.params.id,
        this.UpdateuserForm.value
      )
      .subscribe(
        (res) => {
          this.toastr.success(res.message, undefined, {
            closeButton: true,
            positionClass: 'toast-bottom-center',
          });
          this.routing.navigate(['/company/users']);
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

  checkedDepartment = (id: any) => {
    let checked = false;
    if (this.folder_permissions.length > 0) {
      for (let i = 0; this.folder_permissions.length >= i; i++) {
        if (
          this.folder_permissions[i]?.department_id.toString() == id.toString()
        ) {
          checked = true;
        }
      }
    }
    return checked;
  };
}
