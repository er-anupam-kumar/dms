import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-actions',
  templateUrl: './card-actions.component.html',
  styleUrls: ['./card-actions.component.scss']
})
export class CardActionsComponent implements OnInit {

  public showActions: boolean = false;
	public actions: Array<any> = [{ "key": "Action"}, { "key": "Another Action"}, { "key": "Something else"}];

  constructor() { }

  ngOnInit(): void {
  }

}
