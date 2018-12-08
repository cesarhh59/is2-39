import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatsService } from '../services/chats.service';
import { IResponse } from '../registro/registro.component';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
public chats: string[] = [];
public messages: IMessages [] = [];
public msgSend: String = '';
public chatActivo = '';
constructor( private _router: ActivatedRoute, private _chats: ChatsService) {
  }

  ngOnInit() {
    // Recuperar los chats activos
    this._chats.getListaChats().subscribe((response: IResponse) => {
        this.chats = response.body;
    });


  }
  send(): void {
  this.messages.push({
    user: 'Me',
    msg: this.msgSend
  });
  this.msgSend = '';
  }
  selectedItem(event) {
    this.chatActivo = event;
    // Vacia el chat
    this.messages = [];
     if (this.chatActivo !== '') {
      // Se carga el nuevo chat
      this._chats.getChat(this.chatActivo).subscribe((response: IResponse) => {
        console.log(response.body);
      response.body.forEach(element => {
        this.messages.push({
          user: element.emisor,
          msg: element.texto
        });
      });
      });
      }
  }
}
export interface IMessages {
  user: String;
  msg: String;
}
