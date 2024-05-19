import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss'],
})
export class CreateUsersComponent implements OnInit {
  @ViewChild('createUserForm') createUserForm: NgForm;
  public moduleData: any = [];
  public userstatus: string = '1';
  public viewArray: any = [];
  public modifyArray: any = [];
  buttonDisabled = false;

  constructor(
    private usersService: UsersService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getModuleData();
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

  createUser(value: any) {
    this.buttonDisabled = true;
    this.createUserForm.value.modify = this.modifyArray;
    this.createUserForm.value.view = this.viewArray;
    this.usersService.createUsersFormValue(this.createUserForm.value).subscribe(
      (res) => {
        this.toastr.success(res.message, undefined, {
          closeButton: true,
          positionClass: 'toast-bottom-center',
        });
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
