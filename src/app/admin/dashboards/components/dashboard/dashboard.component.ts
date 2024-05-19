import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { EChartOption } from 'echarts';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AdminDashboardService } from 'src/app/services/adminDashboard/admin-dashboard.service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title = environment.title;

  public clients: any = [];
  public plan: any = [];
  public addons: any = [];
  public users: any = [];
  public sales: any = [];
  public latest_transactions = [];
  public latest_clients = [];
  permissions: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private adminDashboard: AdminDashboardService,
    private authService: AuthenticationService,
    @Inject(DOCUMENT) private document: Document
    ) {}

  ngOnInit(): void {
    this.permissions = this.authService.assignPermitted();
    this.getAdminDashboard();
  }

  getAdminDashboard() {
    this.adminDashboard.getAdminDashboard().subscribe((data) => {
      this.clients = data.clients;
      this.plan = data.plans;
      this.addons = data.addons;
      this.users = data.users;
      this.sales = data.sales;
      this.latest_transactions = data.latest_transactions;
      this.latest_clients = data.latest_clients;
    });
  }
}
