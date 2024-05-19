import { Component, OnInit, OnDestroy } from '@angular/core';
import { LayoutServiceService } from '../../services/layout-service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public title = environment.title;
  public headerDarkClass: string = '';
  private ngUnsubscribe = new Subject();
  public selectedItem: any;
  public active: any = 'langen';
  public isAdmin: string;
  public companyName: string;
  constructor(
    private layoutServiceService: LayoutServiceService,
    private _authuser: AuthenticationService
  ) {}

  ngOnInit() {

    let user = this._authuser.loggedInUser();
    this.isAdmin = user.is_admin;
    this.companyName = user.company_name;

    this.layoutServiceService.headerDarkClassChange
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((headerDarkClass) => {
        this.headerDarkClass = headerDarkClass;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  toggleMenu() {
    this.layoutServiceService.loaderShow();
    let that = this;

    this.layoutServiceService.toggleLeftBar();

    setTimeout(() => {
      that.layoutServiceService.loaderHide();
    }, 500);
  }

  toggleChatBar() {
    this.layoutServiceService.toggleChatBar();
  }

  toggleRightBar() {
    this.layoutServiceService.toggleRightBar();
  }

  toggleSiteMap() {
    this.layoutServiceService.toggleSiteMap();
  }

  toggleSmallMenu() {
    this.layoutServiceService.smallDeviceMenuToggle();
  }

  lan(arg) {
    console.log(arg);
    this.active = arg;
  }

  logoutUserw() {
    this._authuser.logoutUser();
  }
}
