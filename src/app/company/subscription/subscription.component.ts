import { Component, OnInit, ViewChild } from '@angular/core';
import { PlansService } from 'src/app/services/plans/plans.service';
import { AddOnService } from 'src/app/services/add-ons/add-on.service';
import { Router } from '@angular/router';
import { stagger, state } from '@angular/animations';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit {
  active = 1;
  planRows = [];
  addonsRows = [];
  plan_id: string = '';
  subscription: any;

  constructor(
    private plansService: PlansService,
    private addOnService: AddOnService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPlans();
    this.getinvoices();
    this.activePlan();

  }

  activePlan() {
    this.subscription = JSON.parse(localStorage.getItem('subscription'));
    this.plan_id = this.subscription.plan_id;
  }

  getPlans() {
    this.plansService.getPlans().subscribe((data) => {
      this.planRows = data.plans;
    });
  }

  getinvoices() {
    this.addOnService.getAddon().subscribe((data) => {
      this.addonsRows = data.addons;
    });
  }

  payment(id: any, type: string) {
    this.router.navigate(['/company/payments'], {
      state: { id, type },
    });
  }
}
