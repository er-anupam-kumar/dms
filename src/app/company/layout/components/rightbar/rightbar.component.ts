import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutServiceService } from '../../services/layout-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-rightbar',
  templateUrl: './rightbar.component.html',
  styleUrls: ['./rightbar.component.scss']
})
export class RightbarComponent implements OnInit , OnDestroy {

  public chatBarShow: boolean = false;
  public rightOverlayClass: string = "";
  public themeClass: string = "theme-blush";
  public menuClass: string = "";
  public themeDarkClass: string = "dark";
  public rtlClass: string = "";
  public headerDarkClass: string = "";
  private ngUnsubscribe = new Subject();
  public activesetting: string = "";

  constructor(private layoutServiceService: LayoutServiceService) {
      this.layoutServiceService.rightBarShow.pipe(takeUntil(this.ngUnsubscribe)).subscribe(rightBarStatus => {
          this.chatBarShow = rightBarStatus;
          if (rightBarStatus) {
              this.rightOverlayClass = "open";
          } else {
              this.rightOverlayClass = "";
          }
      });
      this.layoutServiceService.themeClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(themeClass => {
          this.themeClass = themeClass;
      });
      this.layoutServiceService.menuClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(menuClass => {
          this.menuClass = menuClass;
      });
      this.layoutServiceService.themeDarkClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(themeDarkClass => {
          this.themeDarkClass = themeDarkClass;
      });
      this.layoutServiceService.rtlClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(rtlClass => {
        this.rtlClass = rtlClass;
      });
      this.layoutServiceService.headerDarkClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(headerDarkClass => {
          this.headerDarkClass = headerDarkClass;
      });
  }
 ngOnInit(){
    this.activesetting='active';
 }
  ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
  }

  changeTheme(theme: string) {
      this.layoutServiceService.themeChange(theme);
  }

  changeMenuClass(menuClass: string) {
      this.layoutServiceService.menuChange(menuClass);
  }

  changeDarkClass(darkClass: string) {
      this.layoutServiceService.themeDarkChange(darkClass);
  }

  changeHeaderDarkClass(darkClass: string){
      this.layoutServiceService.headerDarkChange(darkClass);
  }

  rtlChange(menu: string) {
    this.layoutServiceService.rtlChange(menu);
  }

  darkThemeClass(darkClass: string, headerDarkClass: string, menu: string){
      this.layoutServiceService.darkThemeClass(darkClass, headerDarkClass, menu);
  }

}
