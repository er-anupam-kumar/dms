import { Component, OnInit, Input } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
    selector: 'sa-widget-colored-chart-tile',
    templateUrl: './widget-colored-chart-tile.component.html',
    styleUrls: ['./widget-colored-chart-tile.component.css']
})
export class WidgetColoredChartTileComponent implements OnInit {

    @Input() chartOptions: EChartOption = {};
    @Input() title:string;
    @Input() value:number;
    @Input() background:string;

    constructor() { }

    ngOnInit() {

    }

}
