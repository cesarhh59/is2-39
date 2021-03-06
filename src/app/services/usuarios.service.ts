import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUsuario } from '../registro/registro.component';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public preferencias: string [] = [];
  public ciudades: string [] = [];

  private usersUrl = 'usuarios';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient) {
    // Añadidadas categorias
    this.preferencias.push('Americano');
    this.preferencias.push('Vegetariano');
    this.preferencias.push('Asiático');
    this.preferencias.push('Tailandés');

    // Añadidas ciudades
    this.ciudades.push('Barcelona');
    this.ciudades.push('Madrid');
    this.ciudades.push('Lugo');
    this.ciudades.push('Soria');
    this.ciudades.push('Madrid');
    this.ciudades.push('Zaragoza');
  }

  checkPassword(nombre: string, password: string) {
     // return this.http.get(this.usersUrl);
     const url = this.usersUrl + '/login';
     const user = JSON.stringify( {
       username: nombre,
       password: password
     });
     return this.http.post(url, user, this.httpOptions);
    }
    // Alta usuario
    addUsuario(usuario: IUsuario) {
      const url = this.usersUrl + '/signup';
      const usuarioParse = JSON.stringify(usuario);
      return this.http.post(url, usuarioParse, this.httpOptions);
    }
    // Alta usuario
    editUsuario(user: string, usuario: IUsuario) {
      const url = this.usersUrl + '/editProfile/' + user;
      const usuarioParse = JSON.stringify(usuario);
      return this.http.post(url, usuarioParse, this.httpOptions);
    }
}

