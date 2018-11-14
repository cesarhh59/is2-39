import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAnuncio } from '../gestor/gestor.component';

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

    // Comprar plato
    addPlato(anuncio: IAnuncio) {
      const anuncioParse = JSON.stringify( anuncio);
      const url = this.usersUrl + '/listaPlatos';
      return this.http.post( url, anuncioParse, this.httpOptions);
    }
}
