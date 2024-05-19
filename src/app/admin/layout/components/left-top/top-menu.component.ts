import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LayoutServiceService } from '../../services/layout-service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent implements OnInit, OnDestroy {
  title = environment.title;
  today: number = Date.now();
  public selectedItem: any;
  public active: any = 'langen';
  public headerDarkClass: string = '';
  private ngUnsubscribe = new Subject();
  elem;
  constructor(
    private router: Router,
    private layoutServiceService: LayoutServiceService,
    private _authuser: AuthenticationService,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngOnInit() {
    this.layoutServiceService.headerDarkClassChange
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((headerDarkClass) => {
        this.headerDarkClass = headerDarkClass;
      });
    this.elem = document.documentElement;
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

  sidebar_hide() {
    // let menu = document.querySelector('.left-menu');
    // menu.classList.add('ls-closed');
    // let content = document.getElementsByClassName('content');
    // for (let i = 0; i < content.length; i++) {
    //   content[i].setAttribute('style', 'margin-left:0');
    //   console.log(content[i]);
    // }
  }
}
