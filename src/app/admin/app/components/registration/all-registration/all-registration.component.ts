import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-all-registration',
  templateUrl: './all-registration.component.html',
  styleUrls: ['./all-registration.component.scss'],
})
export class AllRegistrationComponent implements OnInit {
  constructor(
    private registration: RegistrationService,
    private toastr: ToastrService,
    private authService: AuthenticationService
    ) {}

  rows = [];
  temp = [];
  permissions: any;

  @ViewChild(DatatableComponent) myFilterTable: DatatableComponent;
  ngOnInit(): void {
    this.getRegistrationTable();
    this.permissions = this.authService.assignPermitted();
  }
  getRegistrationTable() {
    this.registration.getregistrations().subscribe((data) => {
      this.rows = data.registrations;
      this.temp = [...data.registrations];
    });
  }

  deleteregistration(id) {
    Swal.fire({
      title: 'Are you sure want to delete this registration?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.registration.deleteregistrations(id).subscribe(
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Registration is safe :)', 'error');
      }
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d) {
      return (
        d.company_name.toLowerCase().indexOf(val) !== -1 ||
        d.email.toLowerCase().indexOf(val) !== -1 ||
        d.phone.toLowerCase().indexOf(val) !== -1 ||
        d.contact_name.toLowerCase().indexOf(val) !== -1 ||
        !val
        );
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.myFilterTable.offset = 0;
  }

}
