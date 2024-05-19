import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Input() personimg: string = "";
  @Input() personname: string = "";
  @Input() personmail: string = "";
  @Input() mobilenumber: string = "";
  @Input() telnumber: string = "";
  @Input() address: string = "";
  @Input() facebooklink: string = "";
  @Input() twitterlink: string = "";
  @Input() instagramlink: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
