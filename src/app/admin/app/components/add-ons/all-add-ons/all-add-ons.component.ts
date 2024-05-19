import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AddOnService } from 'src/app/services/add-ons/add-on.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-all-add-ons',
  templateUrl: './all-add-ons.component.html',
  styleUrls: ['./all-add-ons.component.scss'],
})
export class AllAddOnsComponent implements OnInit {
  constructor(
    private addOnService: AddOnService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthenticationService
    ) {}
  rows = [];
  temp = [];
  permissions: any;

  @ViewChild(DatatableComponent) myFilterTable: DatatableComponent;

  ngOnInit(): void {
    this.permissions = this.authService.assignPermitted();
    this.gettabledata();
  }

  gettabledata() {
    this.addOnService.getAddon().subscribe((data) => {
      this.rows = data.addons;
      this.temp = [...data.addons];

    });
  }
  deleteaddon(id) {
    {
      Swal.fire({
        title: 'Are you sure want to delete this addon?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.addOnService.deleteAddon(id).subscribe(
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
          Swal.fire('Cancelled', 'Your addon is safe :)', 'error');
        }
      });
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return (
        d.name.toLowerCase().indexOf(val) !== -1 ||
        d.value.toLowerCase().indexOf(val) !== -1 ||
        d.price.toLowerCase().indexOf(val) !== -1 ||
        !val
        );
    });
    this.rows = temp;
    this.myFilterTable.offset = 0;
  }
}
