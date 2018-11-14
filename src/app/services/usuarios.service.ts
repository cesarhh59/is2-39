import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usersUrl = 'usuarios';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient) { }

  checkPassword(nombre: string, password: string) {
     // return this.http.get(this.usersUrl);
     const url = this.usersUrl + '/login';
     const user = JSON.stringify( {
       username: nombre,
       password: password
     });
     return this.http.post(url, user, this.httpOptions);
    }
}
