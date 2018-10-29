import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
public chats: String [] = [];
  constructor() {
  }

  ngOnInit() {
    this.chats.push('Raul');
    this.chats.push('Pablo');
    this.chats.push('Romina');
    this.chats.push('Justo');
  }

}
