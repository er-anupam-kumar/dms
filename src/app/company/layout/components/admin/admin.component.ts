import {
  Component,
  ChangeDetectorRef,
  OnDestroy,
  HostListener,
  OnInit,
  Inject,
} from '@angular/core';
import { LayoutServiceService } from '../../services/layout-service.service';
import { Router, NavigationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// import { DOCUMENT } from "@angular/platform-browser";

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
  
  public windowScrolled: boolean = false;

  constructor(
    // @Inject(DOCUMENT) private document: Document,
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

  @HostListener('window:scroll', [])
  ngOnInit() {
    this.onWindowScroll()
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 1169) {
      this.lsclosed = 'ls-closed';
    } else {
      this.lsclosed = '';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 1169) {
      this.lsclosed = 'ls-closed';
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

  onWindowScroll() {
    if (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop > 100
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }

}
