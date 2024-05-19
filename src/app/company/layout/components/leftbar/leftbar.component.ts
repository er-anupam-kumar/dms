import {
  Component,
  Input,
  ChangeDetectorRef,
  OnDestroy,
  Inject,
  OnInit,
  HostListener,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { LayoutServiceService } from '../../services/layout-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.scss'],
})
export class LeftbarComponent implements OnInit, OnDestroy {
  @Input() currentActiveMenu: string = 'dashboard';
  @Input() currentActiveSubMenu: string = '';

  public title = environment.title;
  public currentActiveNav: string = '';
  public currentSubActiveNav: string = '';
  public isRtl: boolean = false;
  public menuClass: string = '';
  public rtlClass: string = '';
  private ngUnsubscribe = new Subject();
  public hmenu: string = 'h_menu';
  public isAdmin: string;
  today: number = Date.now();
  elem;
  innerWidth: number;
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthenticationService,
    private layoutServiceService: LayoutServiceService,
    @Inject(DOCUMENT) private document: any
  ) {
    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.getActiveRoutes();
        }
      });
    this.layoutServiceService.menuClassChange
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((menuClass) => {
        this.menuClass = menuClass;
        if (this.menuClass == 'left-menu') {
          this.hmenu = '';
        } else {
          this.hmenu = 'h_menu';
        }
      });
    this.layoutServiceService.rtlClassChange
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((rtlClass) => {
        this.rtlClass = rtlClass;
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 1169) {
      this.hmenu = '';
      // console.log(this.innerWidth);
    } else if (this.menuClass == 'left-menu' && this.innerWidth >= 1169) {
      this.hmenu = '';
    } else {
      this.hmenu = 'h_menu';
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      // document.getElementById('leftsidebar').classList.add('hide-data');
    } else {
      // document.getElementById('leftsidebar').classList.remove('hide-data');
    }
  }

  ngOnInit() {
    let user = this.authService.loggedInUser();
    this.isAdmin = user.is_admin;

    this.elem = document.documentElement;
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 1169) {
      this.hmenu = '';
    } else if (this.menuClass == 'left-menu' && this.innerWidth >= 1169) {
      this.hmenu = '';
    } else {
      this.hmenu = 'h_menu';
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getActiveRoutes() {
    let segments: Array<string> = this.router.url.split('/');
    this.currentActiveNav = segments[1];
    this.cdr.detectChanges();
  }

  changeNavTab(tab: string) {
    if (this.currentActiveNav != tab) {
      this.currentActiveNav = tab;
    } else {
      this.currentActiveNav = '';
    }
  }

  changesubNavTab(tab: string) {
    if (this.currentSubActiveNav != tab) {
      this.currentSubActiveNav = tab;
    } else {
      this.currentSubActiveNav = '';
    }
  }

  toggleRtlLayout() {
    this.layoutServiceService.loaderShow();
    let that = this;
    if (this.isRtl) {
      this.isRtl = false;
      this.layoutServiceService.rtlChange('');
    } else {
      this.isRtl = true;
      this.layoutServiceService.rtlChange('rtl');
    }
    setTimeout(() => {
      that.layoutServiceService.loaderHide();
    }, 500);
  }

  toggleMenu() {
    this.layoutServiceService.loaderShow();
    let that = this;

    this.layoutServiceService.toggleLeftBar();

    setTimeout(() => {
      that.layoutServiceService.loaderHide();
    }, 500);
  }

  topMenuToggle() {
    this.layoutServiceService.loaderShow();
    let that = this;
    if (this.menuClass == 'index2') {
      this.layoutServiceService.menuChange('');
    } else {
      this.layoutServiceService.menuChange('index2');
    }
    setTimeout(() => {
      that.layoutServiceService.loaderHide();
    }, 500);
  }
}
