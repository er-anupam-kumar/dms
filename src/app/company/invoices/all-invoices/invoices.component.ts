import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { InvoicesService } from 'src/app/services/invoices/invoices.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit {
  constructor(private invoicesService: InvoicesService) {}
  rows = [];
  temp = [];

  @ViewChild(DatatableComponent) myFilterTable: DatatableComponent;

  ngOnInit(): void {
    this.getinvoicestabledata();
  }

  getinvoicestabledata() {
    this.invoicesService.getCompanyInvoices().subscribe((data) => {
      this.rows = data.invoices;
      this.temp = [...data.invoices];
    });
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return (
        d.payment_id.toLowerCase().indexOf(val) !== -1 ||
        d.amount.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    this.rows = temp;
    this.myFilterTable.offset = 0;
  }
}
