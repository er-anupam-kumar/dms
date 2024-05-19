import { Component, OnInit, NgZone } from '@angular/core';



@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit {


  constructor(private zone: NgZone) { }
  
  ngOnInit(): void {
  }

}
