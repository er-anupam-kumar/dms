import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './layout/components/header/header.component';
import { AdminComponent } from './layout/components/admin/admin.component';
import { LeftbarComponent } from './layout/components/leftbar/leftbar.component';
import { RightbarComponent } from './layout/components/rightbar/rightbar.component';
import { TopMenuComponent } from './layout/components/left-top/top-menu.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    HeaderComponent,
    AdminComponent,
    LeftbarComponent,
    RightbarComponent,
    TopMenuComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    FullCalendarModule,
    CoreModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
  ],
})
export class AdminModule {}
