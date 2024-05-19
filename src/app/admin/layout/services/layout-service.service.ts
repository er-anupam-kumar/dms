import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LayoutServiceService {

  public leftbarVisible: boolean = true;
  public chatBarVisible:boolean = false;
  public rightbarVisible: boolean = false;
  public siteMapVisible: boolean = false;
  public showLoader: boolean = false;
  public themeClass:string = "theme-cyan";
  public themeDarkClass: string = "dark";
  public menuClass: string = "";
  public rtlClass: string = "";
  public headerDarkClass: string = "";
  public smallDeviceMenu = "";
  public hmenu: string = "";

  public leftBarShow: Subject<boolean> = new Subject<boolean>();
  public chatBarShow: Subject<boolean> = new Subject<boolean>();
  public rightBarShow: Subject<boolean> = new Subject<boolean>();
  public siteMapShow: Subject<boolean> = new Subject<boolean>();
  public showLoaderSubject: Subject<boolean> = new Subject<boolean>();
  public themeClassChange: Subject<string> = new Subject<string>();
  public menuClassChange: Subject<string> = new Subject<string>();
  public rtlClassChange: Subject<string> = new Subject<string>();
  public themeDarkClassChange: Subject<string> = new Subject<string>();
  public headerDarkClassChange: Subject<string> = new Subject<string>();
  public smallDeviceMenuChange: Subject<string> = new Subject<string>();

  constructor() {
    // Left bar subscribers
    this.leftBarShow.subscribe((value) => {
      this.leftbarVisible = value;
    });
    // Chat bar subscribers
    this.chatBarShow.subscribe((value) => {
        this.chatBarVisible = value;
    });
    // Right bar subscribers
    this.rightBarShow.subscribe((value) => {
        this.rightbarVisible = value;
    });
    // Site Map subscribers
    this.siteMapShow.subscribe((value) => {
        this.siteMapVisible = value;
    });
    // Show Loader subscribers
    this.showLoaderSubject.subscribe((value) => {
        this.showLoader = value;
    });

    // Theme Class subscribers
    this.themeClassChange.subscribe((value) => {
        this.themeClass = value;
    });
    // Menu Class subscribers
    this.menuClassChange.subscribe((value) => {
        this.menuClass = value;
        if(this.menuClass=='leftmenu'){
          this.hmenu='';
        }
        else{
          this.hmenu='h_menu';
        }
    });
    // RTL Class subscribers
    this.rtlClassChange.subscribe((value) => {
        this.rtlClass = value;
    });
    // Dark Mode
    this.themeDarkClassChange.subscribe((value) => {
        this.themeDarkClass = value;
    });
    // Header Dark Mode
    this.headerDarkClassChange.subscribe((value) => {
        this.headerDarkClass = value;
    });
    // Small Device Mode
    this.smallDeviceMenuChange.subscribe((value) => {
        this.smallDeviceMenu = value;
    });
  }
  /** Left bar show functions */

  toggleLeftBar() {
      if (this.leftbarVisible){
          this.leftBarShow.next(false);
      } else {
          this.leftBarShow.next(true);
      }
  }

  showLeftBar() {
      this.leftBarShow.next(true);
  }

  hideLeftBar() {
      this.leftBarShow.next(false);
  }

  getLeftBarStatus(){
      return this.leftbarVisible;
  }

  /** Chat bar show functions */

  toggleChatBar() {
      if (this.chatBarVisible) {
          this.chatBarShow.next(false);
      } else {
          this.chatBarShow.next(true);
      }
  }

  showChatBar() {
      this.chatBarShow.next(true);
  }

  hideChatBar() {
      this.chatBarShow.next(false);
  }

  getChatBarStatus() {
      return this.chatBarVisible;
  }

  /** Left bar show functions */

  toggleRightBar() {
      if (this.rightbarVisible) {
          this.rightBarShow.next(false);
      } else {
          this.rightBarShow.next(true);
      }
  }

  showRightBar() {
      this.rightBarShow.next(true);
  }

  hideRightBar() {
      this.rightBarShow.next(false);
  }

  getRightBarStatus() {
      return this.rightbarVisible;
  }

  /** Site map show functions */

  toggleSiteMap() {
      if (this.siteMapVisible) {
          this.siteMapShow.next(false);
      } else {
          this.siteMapShow.next(true);
      }
  }

  showSiteMap() {
      this.siteMapShow.next(true);
  }

  hideSiteMap() {
      this.siteMapShow.next(false);
  }

  getSiteMapStatus() {
      return this.siteMapVisible;
  }

  loaderShow() {
      this.showLoaderSubject.next(true);
  }

  loaderHide() {
      this.showLoaderSubject.next(false);
  }

  getLoaderStatus() {
      return this.showLoaderSubject;
  }

  /** Theme Class functions */
  themeChange(theme: string) {
      this.themeClassChange.next(theme);
  }

  /** Menu Class functions */
  menuChange(menu: string) {
      this.menuClassChange.next(menu);
  }

  /** Rtl Class functions */
  rtlChange(menu: string) {
      this.rtlClassChange.next(menu);
  }

  /** Dark Class functions */
  themeDarkChange(darkClass: string) {
      this.themeDarkClassChange.next(darkClass);
  }

  /** Header Dark Class functions */
  headerDarkChange(darkClass: string) {
      this.headerDarkClassChange.next(darkClass);
  }

  /** Dark Theme function */
  darkThemeClass(darkClass: string, headerDarkClass: string, menu: string) {
      this.headerDarkClassChange.next(headerDarkClass);
      this.themeDarkClassChange.next(darkClass);
      //this.menuClassChange.next(menu);
  }

  /** Toggle Left Bar on Small screens Class functions */
  smallDeviceMenuToggle() {
      if (this.smallDeviceMenu){
          this.smallDeviceMenuChange.next("");
      } else {
          this.smallDeviceMenuChange.next("overlay-open");
      }
  }

  /** Hide Left Bar on Small screens Class functions */
  smallDeviceMenuHide() {
      this.smallDeviceMenuChange.next("");
  }
}
