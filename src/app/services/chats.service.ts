import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  private usersUrl = 'mensajes';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient) { }

  getListaChats() {
     const url = this.usersUrl + '/listaMensajes/' + localStorage.getItem('token');
     return this.http.get(url);
    }
}
