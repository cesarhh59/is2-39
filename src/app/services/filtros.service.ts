import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {
  public alergenos: string [] = [];
  private usersUrl = 'platos';
  private httpOptions =  new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {
    this.alergenos.push('lactosa');
    this.alergenos.push('glucosa');
    this.alergenos.push('fructosa');
  }

  getAlergenos(): string[] {
    return this.alergenos;
  }

  getAnunciosAlergenos(usuario: string) {
    const url = this.usersUrl + '/listaPlatos/';
    const params = new HttpParams().set('alergenos', usuario);
    console.log(params);
    return this.http.get(url, { headers: this.httpOptions, params: params});
  }
  getAnunciosLocalizacion(usuario: string) {
    const url = this.usersUrl + '/listaPlatos/';
    const params = new HttpParams().set('location', usuario);
    console.log(params);
    return this.http.get(url, { headers: this.httpOptions, params: params});
  }
  getAnunciosPreferencias(usuario: string) {
    const url = this.usersUrl + '/listaPlatos/';
    const params = new HttpParams().set('alergenos', usuario).set('location', usuario);
    console.log(params);
    return this.http.get(url, { headers: this.httpOptions, params: params});
  }
}
