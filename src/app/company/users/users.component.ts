import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { UsersService } from 'src/app/services/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private toastr: ToastrService,
    private router: Router
  ) { }
  rows = [];
  temp = [];

  @ViewChild(DatatableComponent) myFilterTable: DatatableComponent;

  ngOnInit(): void {
    this.getAllUserTable();
  }

  getAllUserTable() {
    this.usersService.getecompanyUsersData().subscribe((data) => {
      this.rows = data.users;
      this.temp = [...data.users];

    });
  }

  deleteAllUserTable(id) {
    Swal.fire({
      title: 'Are you sure want to delete this user?',
      text: "All data linked with this user will get deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteCompanyUser(id).subscribe(
          (res: any) => {
            this.toastr.success(res.message, undefined, {
              closeButton: true,
              positionClass: 'toast-bottom-center',
            });

            this.ngOnInit();
          },
          (err) => {
            this.toastr.error(err.error.message, undefined, {
              closeButton: true,
              positionClass: 'toast-bottom-center',
            });
          }
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelled',
          'User is safe :)',
          'error'
        )
      }
    })
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return (
        d.name.toLowerCase().indexOf(val) !== -1 ||
        d.email.toLowerCase().indexOf(val) !== -1 ||
        d.phone.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    this.rows = temp;
    this.myFilterTable.offset = 0;
  }
}
