import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PieChartWidgetComponent } from './pie-chart-widget/pie-chart-widget.component';
import { DetailTilesComponent } from './detail-tiles/detail-tiles.component';
import { BarBulletsComponent } from './bar-bullets/bar-bullets.component';
import { CardActionsComponent } from './card-actions/card-actions.component';
import { ChordDiagramComponent } from './chord-diagram/chord-diagram.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { TimelineDiagramComponent } from './timeline-diagram/timeline-diagram.component';
import { WidgetChatComponent } from './widget-chat/widget-chat.component';
import { SocialCardComponent } from './social-card/social-card.component';
import { DataManageComponent } from './data-manage/data-manage.component';
import { MarketingCampaignComponent } from './marketing-campaign/marketing-campaign.component';
import { NewConnectionComponent } from './new-connection/new-connection.component';
import { WeatherInfoComponent } from './weather-info/weather-info.component';
import { UseraccontInfoComponent } from './useraccont-info/useraccont-info.component';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { CollepsibleComponent } from './collepsible/collepsible.component';
import { AccordionComponent } from './accordion/accordion.component';
import { ProgressbarDefaultComponent } from './progressbar-default/progressbar-default.component';
import { ActivityPostComponent } from './activity-post/activity-post.component';
import { SystemWidgetComponent } from './system-widget/system-widget.component';
import { AppliancesWidgetComponent } from './appliances-widget/appliances-widget.component';
import { ApplianceStatusWidgetComponent } from './appliance-status-widget/appliance-status-widget.component';
import { ProductDataComponent } from './product-data/product-data.component';
import { ContactComponent } from './contact/contact.component';
import { WidgetColoredChartTileComponent } from './widget-colored-chart-tile/widget-colored-chart-tile.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ReferralsComponent } from './referrals/referrals.component';
import * as echarts from 'echarts';


@NgModule({
  declarations: [
    PieChartWidgetComponent,
    DetailTilesComponent,
    BarBulletsComponent,
    CardActionsComponent,
    ChordDiagramComponent,
    DonutChartComponent,
    TimelineDiagramComponent,
    WidgetChatComponent,
    SocialCardComponent,
    DataManageComponent,
    MarketingCampaignComponent,
    NewConnectionComponent,
    WeatherInfoComponent,
    UseraccontInfoComponent,
    AlertMessageComponent,
    CollepsibleComponent,
    AccordionComponent,
    ProgressbarDefaultComponent,
    ActivityPostComponent,
    SystemWidgetComponent,
    AppliancesWidgetComponent,
    ApplianceStatusWidgetComponent,
    ProductDataComponent,
    ContactComponent,
    WidgetColoredChartTileComponent,
    ReferralsComponent,
  ],
  exports: [
    PieChartWidgetComponent,
    DetailTilesComponent,
    BarBulletsComponent,
    CardActionsComponent,
    ChordDiagramComponent,
    DonutChartComponent,
    TimelineDiagramComponent,
    WidgetChatComponent,
    SocialCardComponent,
    DataManageComponent,
    MarketingCampaignComponent,
    NewConnectionComponent,
    WeatherInfoComponent,
    UseraccontInfoComponent,
    AlertMessageComponent,
    CollepsibleComponent,
    AccordionComponent,
    ProgressbarDefaultComponent,
    ActivityPostComponent,
    SystemWidgetComponent,
    AppliancesWidgetComponent,
    ApplianceStatusWidgetComponent,
    ProductDataComponent,
    ContactComponent,
    WidgetColoredChartTileComponent,
    ReferralsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
  ]
})
export class CoreModule {

}
