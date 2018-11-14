import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
public chats: String [] = [];
public messages: IMessages [] = [];
public msgSend: String = '';
constructor() {
  }

  ngOnInit() {
    this.chats.push('Raul');
    this.chats.push('Pablo');
    this.chats.push('Romina');
    this.chats.push('Justo');

    this.messages.push({
     user: 'me',
      msg: 'Tienes algo para mi'
    });
    this.messages.push({
      user: 'Julio',
       msg: 'La coca'
     }); this.messages.push({
      user: 'me',
       msg: 'For me'
     }); this.messages.push({
      user: 'me',
       msg: 'yas'
     });

  }
  send(): void {
  this.messages.push({
    user: 'me',
    msg: this.msgSend
  });
  this.msgSend = '';
  }

}
export interface IMessages {
  user: String;
  msg: String;
}
