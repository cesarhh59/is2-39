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
public chats;
public messages: IMessages [] = [];
public msgSend: String = '';
public chatActivo = '';
constructor( private _router: ActivatedRoute, private _chats: ChatsService) {
  }

  ngOnInit() {

  // TODO recuperar todos los chats de un usuario
    // this.chats.push('Raul');
    // this.chats.push('Pablo');
    // this.chats.push('Romina');
    // this.chats.push('Justo');
    this._chats.getListaChats().subscribe((response: IResponse) => {
      this.chats = response.boody;
      console.log(response);
    });


  }
  send(): void {
  this.messages.push({
    user: 'me',
    msg: this.msgSend
  });
  this.msgSend = '';
  }
  selectedItem(event) {
    this.chatActivo = event;
    // TODO cargar chat seleccionado
     // Recuperamos el chat activo

     if (this.chatActivo !== '') {
      // TODO cargar chats de ese usuario
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

      } else {
        this.messages = [];
      }
  }
}
export interface IMessages {
  user: String;
  msg: String;
}
