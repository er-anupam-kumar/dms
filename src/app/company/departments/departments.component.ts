import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DepartmentsService } from 'src/app/services/departments/departments.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent implements OnInit {
  constructor(
    private departmentsService: DepartmentsService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  rows = [];
  temp = [];

  @ViewChild(DatatableComponent) myFilterTable: DatatableComponent;

  ngOnInit(): void {
    this.getAllUserTable();
  }

  getAllUserTable() {
    this.departmentsService.getecompanydepartmentssData().subscribe((data) => {
      this.rows = data.departments;
      this.temp = [...data.departments];
    });
  }

  deleteAllUserTable(id) {
    Swal.fire({
      title: 'Are you sure want to delete this department ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.departmentsService.deleteCompanydepartments(id).subscribe(
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
        Swal.fire('Cancelled', 'Department is safe :)', 'error');
      }
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return (
        d.name.toLowerCase().indexOf(val) !== -1 ||
        d.unique_id.toLowerCase().indexOf(val) !== -1 ||
        // d.price.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    this.rows = temp;
    this.myFilterTable.offset = 0;
  }
}
