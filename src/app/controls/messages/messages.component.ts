import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @Input() message: String = 'prueba';
  @Input() mode: String = 'alert alert-success';
  constructor() { }

  ngOnInit() {
  }


}
