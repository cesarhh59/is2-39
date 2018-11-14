import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {

  private usersUrl = 'platos';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient) { }

  getPlatos() {
     const url = this.usersUrl + '/listaPlatos';
     return this.http.get(url);
    }
}
