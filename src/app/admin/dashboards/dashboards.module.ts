
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DashboardRoutingModule } from './dashboards-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CoreModule } from 'src/app/core/core.module';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { NgCircleProgressModule } from 'ng-circle-progress';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
    NgCircleProgressModule.forRoot({
    }),
  ]
})
export class DashboardModule { }
