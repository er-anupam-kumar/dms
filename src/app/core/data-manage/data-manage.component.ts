import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-data-manage',
  templateUrl: './data-manage.component.html',
  styleUrls: ['./data-manage.component.scss']
})
export class DataManageComponent implements OnInit {
  public barchartoption: EChartOption = {};
  constructor() {
    this.barchartoption = {
      tooltip: {
        axisPointer: {
            type: 'shadow'
        },
      },

      grid: {
          top:1,
          bottom:0,
          right:0,
          left:0
      },
      xAxis: [
          {
              type: 'category',
              boundaryGap: false,
              axisLine: {
                  show: false
              },
          }
      ],
      yAxis: [
          {
              type: 'value',
              splitLine: {show:false},
              axisLine: {
                  show:false
              },
              axisLabel: {
                show:false,
              }
          }
      ],
      series: [
        {
          type: 'bar',
          data:[4,1,5,2,7,3,4],
          itemStyle: {
              color: "rgba(0,206,209, 1)",
          },
          symbolSize: 1,
        }
      ]
    };
  }

  ngOnInit(): void {
  }

}
