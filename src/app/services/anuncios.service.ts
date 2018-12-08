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

  getPlatosPropietario(propietario: string) {
    const url = this.usersUrl + '/listaPlatos/' + propietario + '/propietario';
    return this.http.get(url);
  }
  // Crear plato
  addPlato(anuncio: IAnuncio) {
    const anuncioParse = JSON.stringify( anuncio);
    const url = this.usersUrl + '/listaPlatos';
    return this.http.post( url, anuncioParse, this.httpOptions);
  }
  getPlato(titulo: string) {
    const url = this.usersUrl + '/listaPlatos/' + titulo;
    return this.http.get(url);
  }
  // Comprar plato
  comprarPlato(titulo: string, porciones: number) {
    const url = this.usersUrl + '/listaPlatos/' + titulo + '/comprar/' + porciones + '/' + localStorage.getItem('token');
    return this.http.get(url);
  }
  // Comprar plato
  valorarPlato(titulo: string, valoracion: number) {
    const url = this.usersUrl + '/listaPlatos/' + titulo + '/valorar/' + valoracion;
    return this.http.get(url);
  }
  activarAnuncio(titulo: string) {
    const url = this.usersUrl + '/listaPlatos/' + titulo + '/activar/';
    return this.http.get(url);
  }
  desactivarAnuncio(titulo: string) {
    const url = this.usersUrl + '/listaPlatos/' + titulo + '/desactivar/';
    return this.http.get(url);
  }

  getPlatoRecomendados(user: string) {
    const url = this.usersUrl + '/platosRecomendados/' + user ;
    return this.http.get(url);
  }
}
