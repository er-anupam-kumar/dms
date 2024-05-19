import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { EChartOption } from 'echarts';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { CompanyDashboardService } from 'src/app/services/companyDashboard/company-dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public search: string = '';
  public isAdmin: string;
  public active_addons: any;
  public active_plan: any;
  public files: any = [];
  public pending_invoices: any;
  public storage: any = [];
  public users: any = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authService: AuthenticationService,
    private companyDashboard: CompanyDashboardService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    let user = this.authService.loggedInUser();
    this.isAdmin = user.is_admin;
    this.getcompanyDashboard();
  }

  searchEnter = (event) => {
    event.preventDefault();
    if (event.key == 'Enter') {
      return this.searchItem();
    }
  };

  searchItem() {
    this.search = this.search.trim();
    if (this.search) {
      this.router.navigate([`/company/documents/search/${this.search}`]);
    }
  }

  getcompanyDashboard() {
    this.companyDashboard.getCompanyDashboard().subscribe((data) => {
      this.active_addons = data.active_addons;
      this.active_plan = data.active_plan;
      this.files = data.files;
      this.pending_invoices = data.pending_invoices;
      this.storage = data.storage;
      this.users = data.users;
    });
  }
}
