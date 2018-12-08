import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatsService } from '../services/chats.service';
import { IResponse } from '../registro/registro.component';
import { AnunciosService } from '../services/anuncios.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
public chatCompleto: string [] = [];
public chats: string[] = [];
public chatsPlatos: string [] = [];
public messages: IMessages [] = [];
public msgSend: String = '';
public chatActivo = '';
public userName: string =  localStorage.getItem('token');
constructor( private _router: ActivatedRoute, private _chats: ChatsService, private _anuncios: AnunciosService) { }

  ngOnInit() {
    // Recuperar los chats activos
    this._chats.getListaChats().subscribe((response: IResponse) => {
      response.body.forEach(element => {
        this.chats.push(element);
        this.chatCompleto.push(element);
      });

    });
    // Recuperar los chats de platos
    this._anuncios.getPlatosPropietario(this.userName).subscribe((response: IResponse) => {
      response.platos.forEach(element => {
        this.chatsPlatos.push(element);
        this.chatCompleto.push(element);

      });
    });
  }
  send(): void {
    const auxMessage: IMessagesResponse = {
      user: localStorage.getItem('token'),
      msg: this.msgSend,
      idPlato: this.chatActivo
    };
  this.messages.push(auxMessage);
  // LLamar a la mierda escribirI
   this._chats.setChat(auxMessage).subscribe((response: IResponse) => {
     console.log(response);
   });
  this.msgSend = '';
  }
  selectedItem(event) {
    this.chatActivo = event;
    // Vacia el chat
    this.messages = [];
     if (this.chatActivo !== '') {
      // Se carga el nuevo chat
      if (this.chats.includes(this.chatActivo)) {

        this._chats.getChat(this.chatActivo).subscribe((response: IResponse) => {
          console.log(response.body);
          response.body.forEach(element => {
            this.messages.push({
              user: element.emisor,
              msg: element.texto
            });
          });
        });
      } else {
       this._chats.getChatPlato(this.chatActivo).subscribe((response: IResponse) => {
         console.log(response);
         response.body.forEach(element => {
           element.msgs.forEach(ele => {
            this.messages.push({
              user: ele.emisor,
              msg: ele.texto
            });
           });
        });
       });
      }
      }
  }
}
export interface IMessages {
  user: String;
  msg: String;
}
export interface IMessagesResponse {
  user: String;
  msg: String;
  idPlato: String;
}
