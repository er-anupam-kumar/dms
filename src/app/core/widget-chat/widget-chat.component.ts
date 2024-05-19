import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-widget-chat',
  templateUrl: './widget-chat.component.html',
  styleUrls: ['./widget-chat.component.scss']
})
export class WidgetChatComponent implements OnInit {

  @Input() options:any = {};
  @Output() onSendEvent = new EventEmitter();
  @ViewChild('chatBox', { static: false }) private myScrollContainer: ElementRef;

  public newMessage:string = "";
  status: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  onSend(){
      if(this.newMessage){
        let event: any = { message: this.newMessage };
        this.onSendEvent.emit(event);
        this.newMessage = "";
      }
  }

  clickEvent(){
    this.status = !this.status;
  }
}
