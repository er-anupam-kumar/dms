import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.scss']
})
export class ProductDataComponent implements OnInit {

  @Input() productbard: string = "";
  @Input() productname: string = "";
  @Input() discountprice: string = "";
  @Input() orignalprice: string = "";
  @Input() productimg: string = "";
  @Input() ratingcount: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
