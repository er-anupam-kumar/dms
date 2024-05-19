import { Component, OnInit } from '@angular/core';
import { PlansService } from 'src/app/services/plans/plans.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { InvoicesService } from 'src/app/services/invoices/invoices.service';
import { AddOnService } from 'src/app/services/add-ons/add-on.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
declare var Razorpay: any;

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  public name: string;
  public description: string;
  public price: number;
  public user: any;
  public pay_type: any;
  public order_id: string;
  rows = [];
  razorpay_payment_id: string;
  amount: number;
  razorPaydata: any;

  public options = {
    key: environment.razorPayApiKey,
    amount: 0,
    currency: 'INR',
    name: '',
    description: '',
    image: '',
    order_id: '',
    handler: function (response) {},
    prefill: {
      name: '',
      email: '',
      contact: '',
    },
    theme: {
      color: '#e47297',
    },
  };

  constructor(
    private plansService: PlansService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private addOnService: AddOnService,
    private invoicesService: InvoicesService,
    private pay: PaymentService
    ) {}

  ngOnInit(): void {
    this.getUser();
    this.pay_type = history.state.type;
    if (history.state.type == 'plan') {
      this.getPlan();
    } else if (history.state.type == 'addon') {
      this.getAddon();
    } else if (history.state.type == 'invoice') {
      this.getInvoice();
    } else {
      this.toastr.error('Something went wrong.', undefined, {
        closeButton: true,
        positionClass: 'toast-bottom-center',
      });
      this.router.navigate(['/company']);
    }
  }

  getUser() {
    let user: any = JSON.parse(localStorage.getItem('user'));
    this.options.prefill.name = user.name;
    this.options.prefill.email = user.email;
    this.options.prefill.contact = '+91'+user.phone;
  }

  getPlan() {
    this.plansService.editPlan(history.state.id).subscribe((data) => {
      this.name = data.plan.name;
      this.description = data.plan.description;
      this.price = data.plan.price;
      this.amount = data.plan.price;
      this.options.amount = data.plan.price * 100;
      this.options.description = data.plan.description;
      this.options.name = data.plan.name;
    });
  }

  getAddon() {
    this.addOnService.editAddon(history.state.id).subscribe((data) => {
      this.name = data.addon.name;
      this.description = data.addon.description;
      this.options.amount = data.addon.price * 100;
      this.options.description = data.addon.description;
      this.options.name = data.addon.name;
      this.price = data.addon.price;
      this.amount = data.addon.price;
    });
  }

  getInvoice() {
    this.invoicesService
    .getCompanyViewInvoices(history.state.id)
    .subscribe((res) => {
      this.order_id = res.invoice.id;
      this.price = res.invoice.amount;
      this.amount = res.invoice.amount;
      this.rows = res.invoice.description;
    });
  }

  payNow() {
    this.options.handler = this.razorPayResponseHandler;
    var rzp1 = new Razorpay(this.options);
    rzp1.open();
  }

  razorPayResponseHandler = (res) => {
    this.razorpay_payment_id = res.razorpay_payment_id;
    if (res.razorpay_payment_id) {
      this.razorPaydata = {
        type: history.state.type,
        reference_id: history.state.id,
        gateway: 'razorpay',
        razorpay_payment_id: this.razorpay_payment_id,
        amount: this.price,
      };
      this.pay.getTransactions(this.razorPaydata).subscribe(
        (data) => {
          this.toastr.success('Payment sucessful !', undefined, {
            closeButton: true,
            positionClass: 'toast-bottom-center',
          });
          if (history.state.type == 'plan') {
            localStorage.setItem('subscription',JSON.stringify(data.subscription));
          }
          this.router.navigate(['/company/invoices']);
        },
        (err) => {
          this.toastr.error('Something went wrong', undefined, {
            closeButton: true,
            positionClass: 'toast-bottom-center',
          });
        }
        );
    } else {
      this.toastr.error('Payment failed', undefined, {

        closeButton: true,
        positionClass: 'toast-bottom-center',
      });
    }
  };

}
