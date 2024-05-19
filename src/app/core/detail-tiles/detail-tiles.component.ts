import { Component, OnInit, Input } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-detail-tiles',
  templateUrl: './detail-tiles.component.html',
  styleUrls: ['./detail-tiles.component.scss']
})
export class DetailTilesComponent implements OnInit {

  @Input() title: string = "";
  @Input() value: string = "";
  @Input() details: string = "";
  @Input() progressColor: string = "";
  @Input() progress: string = "";
  @Input() chartOptions: EChartOption = {};
  constructor() { }

  ngOnInit(): void {
  }

}
