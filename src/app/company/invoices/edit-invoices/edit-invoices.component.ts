import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoicesService } from 'src/app/services/invoices/invoices.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-edit-invoices',
  templateUrl: './edit-invoices.component.html',
  styleUrls: ['./edit-invoices.component.scss'],
})
export class EditInvoicesComponent implements OnInit {
  public company: any;
  public order_date = '';
  public order_id = '';
  public payment_id = '';
  public sgst: number;
  public cgst: number;
  public igst: number;
  public amount: number;
  public subtotal: number;
  status: number;
  rows = [];
  invoiceid = '';

  constructor(
    private arouter: ActivatedRoute,
    private invoicesService: InvoicesService,
    private toastr: ToastrService,
    private Routing: Router
    ) {}

  @ViewChild(DatatableComponent) myFilterTable: DatatableComponent;

  ngOnInit(): void {
    this.getviewInvoices();
    this.invoiceid = this.arouter.snapshot.params.id;
  }

  getviewInvoices() {
    this.invoicesService
    .getCompanyViewInvoices(this.arouter.snapshot.params.id)
    .subscribe((res) => {
      this.company = res.invoice.company;
      this.order_date = res.invoice.created_at;
      this.payment_id = res.invoice.payment_id;
      this.order_id = res.invoice.id;
      this.status = res.invoice.status;
      this.rows = res.invoice.description;
      this.sgst = res.invoice.sgst*1;
      this.cgst = res.invoice.cgst*1;
      this.igst = res.invoice.igst*1;
      this.amount = res.invoice.amount*1;
      this.subtotal = (this.amount/(100+this.cgst+this.sgst+this.igst)) * 100;
    });
  }

  payment(id: any, type: string) {
    this.Routing.navigate(['/company/payments'], {
      state: { id, type },
    });
  }
}
