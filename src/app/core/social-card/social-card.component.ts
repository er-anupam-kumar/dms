import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-social-card',
  templateUrl: './social-card.component.html',
  styleUrls: ['./social-card.component.scss']
})
export class SocialCardComponent implements OnInit {

  @Input() title: string = "";
  @Input() value: string = "";
  @Input() details: string = "";
  @Input() socialbgColor: string = "";
  @Input() iconName: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
