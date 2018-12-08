import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {  IMessagesResponse } from '../chats/chats.component';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  private usersUrl = 'mensajes';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient) { }

  getListaChats() {
     const url = this.usersUrl + '/listaChats/' + localStorage.getItem('token');
     return this.http.get(url);
    }
  getChat(chat: string) {
      const url = this.usersUrl + '/listaMensajes/' + chat;
      return this.http.get(url);
  }
  setChat(chat: IMessagesResponse) {
    const url = this.usersUrl + '/listaMensajes/' + chat.idPlato;
    const chatParse = JSON.stringify(chat);
    return this.http.post(url, chatParse , this.httpOptions);
}
}
