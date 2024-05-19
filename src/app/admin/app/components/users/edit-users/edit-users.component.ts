import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss'],
})
export class EditUsersComponent implements OnInit {
  @ViewChild('editUserForm') editUserForm: NgForm;
  buttonDisabled = false;
  public moduleData: any = [];
  public viewArray: any = [];
  public modifyArray: any = [];
  public name = '';
  public email = '';
  public phone = '';
  public address = '';
  public city = '';
  public status = '';
  public state = '';
  public id = '';

  constructor(
    private usersService: UsersService,
    private router: Router,
    private arouter: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getModuleData();
    this.id = this.arouter.snapshot.params.id;
    this.getUserData();
  }

  getModuleData() {
    this.usersService.getModule().subscribe((moduleData) => {
      this.moduleData = moduleData.modules;
    });
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

  getUserData() {
    this.usersService
      .geteditUser(this.arouter.snapshot.params.id)
      .subscribe((res) => {
        this.name = res.user.name;
        this.email = res.user.email;
        this.phone = res.user.phone;
        this.address = res.user.address;
        this.city = res.user.city;
        this.status = res.user.status;
        this.state = res.user.state;

        if (res.permissions.length > 0) {
          for (let index = 0; index < res.permissions.length; index++) {
            if (res.permissions[index].modify == '1') {
              this.modifyArray.push(res.permissions[index].module_id);
            }
            if (res.permissions[index].view == '1') {
              this.viewArray.push(res.permissions[index].module_id);
            }
          }
        }
      });
  }

  editUserFormValue(value: any) {
    this.buttonDisabled = true;
    this.editUserForm.value.modify = this.modifyArray;
    this.editUserForm.value.view = this.viewArray;
    this.usersService
      .updateEditUser(this.id, this.editUserForm.value)
      .subscribe(
        (res) => {
          this.toastr.success(res.message, undefined, {
            closeButton: true,
            positionClass: 'toast-bottom-center',
          });
          this.ngOnInit();
          this.router.navigate(['/admin/app/all-users']);
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
