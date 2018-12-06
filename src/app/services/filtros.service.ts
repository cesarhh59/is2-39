import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {
  public alergenos: string [] = [];
  private usersUrl = 'platos';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient) {
    this.alergenos.push('Lactosa');
    this.alergenos.push('Celiaco');
  }

  getAlergenos(): string[] {
    return this.alergenos;
  }

  getAnunciosAlergenos(usuario: string) {
    const url = this.usersUrl + '/listaPlatos/';
    const parms: HttpParams = new HttpParams();
    parms.set('alergenos', usuario);
    return this.http.get(url, { params: parms});
  }
}
