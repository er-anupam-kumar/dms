import {
  Component,
  ChangeDetectorRef,
  OnDestroy,
  HostListener,
  OnInit,
} from '@angular/core';
import { LayoutServiceService } from '../../services/layout-service.service';
import { Router, NavigationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  public leftBarShow: boolean = true;
  public chatBarShow: boolean = false;
  public rightBarShow: boolean = false;
  public rightOverlayDisplay: string = 'none';
  public themeClass: string = 'theme-blush';
  public smallDeviceMenu = '';
  public themeDarkClass: string = 'light';
  public menuClass: string = '';
  public rtlClass: string = '';
  public showLoader: boolean = true;
  public currentActiveMenu = 'dashboard';
  public currentActiveSubMenu;
  private ngUnsubscribe = new Subject();
  innerWidth: number;
  public lsclosed: string = '';

  constructor(
    private layoutServiceService: LayoutServiceService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.showLoader = false;
        }
      });
    this.layoutServiceService.leftBarShow
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((leftBarStatus) => {
        this.leftBarShow = leftBarStatus;
      });
    this.layoutServiceService.chatBarShow
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((chatBarStatus) => {
        this.chatBarShow = chatBarStatus;
        this.resetRightOverlayStatus();
      });
    this.layoutServiceService.rightBarShow
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((rightBarStatus) => {
        this.rightBarShow = rightBarStatus;
        this.resetRightOverlayStatus();
      });
    this.layoutServiceService.showLoaderSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((showLoaderStatus) => {
        this.showLoader = showLoaderStatus;
      });
    this.layoutServiceService.themeClassChange
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((themeClass) => {
        this.themeClass = themeClass;
      });
    this.layoutServiceService.menuClassChange
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((menuClass) => {
        this.menuClass = menuClass;
      });
    this.layoutServiceService.rtlClassChange
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((rtlClass) => {
        this.rtlClass = rtlClass;
      });
    this.layoutServiceService.themeDarkClassChange
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((themeDarkClass) => {
        this.themeDarkClass = themeDarkClass;
      });
    this.layoutServiceService.smallDeviceMenuChange
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((smallDeviceMenu) => {
        this.smallDeviceMenu = smallDeviceMenu;
        this.resetRightOverlayStatus();
      });
  }

  ngOnInit() {
    // let user = localStorage.getItem('user');
    // let _array = JSON.parse(user);
    // if (_array.user_type == 'Admin') {
    //   this.router.navigate(['/admin']);
    // } else if (_array.user_type == 'Client') {
    //   this.router.navigate(['/company']);
    // } else {
    //   this.router.navigate(['../']);
    // }


    this.innerWidth = window.innerWidth;
    // console.log(this.innerWidth);
    if (this.innerWidth <= 1169) {
      this.lsclosed = 'ls-closed';
      // console.log(this.innerWidth);
    } else {
      this.lsclosed = '';
    }
    this.layoutServiceService.menuChange('left-menu');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 1169) {
      this.lsclosed = 'ls-closed';
      // console.log(this.innerWidth);
    } else {
      this.lsclosed = '';
    }
  }
  @HostListener('load', ['$event']) onPageLoad(event: Event) {
    console.log('loaded');
    this.onResize(event);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  hideRightPanel() {
    this.layoutServiceService.hideChatBar();
    this.layoutServiceService.hideRightBar();
    this.layoutServiceService.smallDeviceMenuHide();
  }

  resetRightOverlayStatus() {
    if (this.chatBarShow || this.rightBarShow || this.smallDeviceMenu) {
      this.rightOverlayDisplay = 'block';
    } else {
      this.rightOverlayDisplay = 'none';
    }
  }

  getActiveRoutes() {
    let segments: Array<string> = this.router.url.split('/');
    this.currentActiveMenu = segments[1];
    this.currentActiveSubMenu = segments[2];
    this.cdr.detectChanges();
  }
}
