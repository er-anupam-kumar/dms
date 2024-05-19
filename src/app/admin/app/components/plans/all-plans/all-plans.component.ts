import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { PlansService } from 'src/app/services/plans/plans.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-all-plans',
  templateUrl: './all-plans.component.html',
  styleUrls: ['./all-plans.component.scss'],
})
export class AllPlansComponent implements OnInit {
  constructor(
    private plansService: PlansService,
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
    this.getPlansTable();
  }

  getPlansTable() {
    this.plansService.getPlans().subscribe((data) => {
      this.rows = data.plans;
      this.temp = [...data.plans];
    });
  }

  deletePlan(id) {
    Swal.fire({
      title: 'Are you sure want to delete this plan?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.plansService.deletePlan(id).subscribe(
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
        Swal.fire('Cancelled', 'Your plan is safe :)', 'error');
      } 
    });
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return (
        d.name.toLowerCase().indexOf(val) !== -1 ||
        d.users.toLowerCase().indexOf(val) !== -1 ||
        d.price.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    this.rows = temp;
    this.myFilterTable.offset = 0;
  }
}
