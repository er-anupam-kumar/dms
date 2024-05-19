import { Component, OnInit, OnDestroy,Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LayoutServiceService } from '../../services/layout-service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit, OnDestroy {
  today: number = Date.now();
  public selectedItem :any;
  public active:any='langen';
  public headerDarkClass: string = "";
  private ngUnsubscribe = new Subject();
  elem;
  constructor(private layoutServiceService: LayoutServiceService,@Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
      this.layoutServiceService.headerDarkClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(headerDarkClass => {
          this.headerDarkClass = headerDarkClass;
      });
      this.elem = document.documentElement;
  }

  ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
  }

  toggleMenu(){
      this.layoutServiceService.loaderShow();
      let that = this;

      this.layoutServiceService.toggleLeftBar();

      setTimeout(() => {
          that.layoutServiceService.loaderHide();
      }, 500);
  }

  toggleChatBar(){
      this.layoutServiceService.toggleChatBar();
  }

  toggleRightBar(){
      this.layoutServiceService.toggleRightBar();
  }

  toggleSiteMap() {
      this.layoutServiceService.toggleSiteMap();
  }

  toggleSmallMenu() {
      this.layoutServiceService.smallDeviceMenuToggle();
  }

  lan(arg){
    console.log(arg);
    this.active=arg;
  }
}
