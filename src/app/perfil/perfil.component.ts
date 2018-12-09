import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UsuariosService } from '../services/usuarios.service';
import { IUsuario, IResponse } from '../registro/registro.component';
import { FiltrosService } from '../services/filtros.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public ciudades: string [] = [];

  public alergenos: string [] = [];
  public selectedAlergenos: string [] = [];

  public preferencias: string [] = [];
  public selPreferencias: string [] = [];

  public errores: string [] = [];
  public usuario: IUsuario;
  constructor(private _authService: AuthService, private usuarioService: UsuariosService, private _filtros: FiltrosService) { }

  ngOnInit() {
    this.alergenos = this._filtros.getAlergenos();
    this.preferencias = this.usuarioService.preferencias;
    this.ciudades = this.usuarioService.ciudades;
  }

  editProfile(nombre: string, password: string, mail: string, ciudad: string, contacto: number) {
    this.usuario = {
      nombre: nombre,
      password: password ,
      email: mail,
      contacto: contacto,
      ciudad: ciudad,
      alergenos: this.selectedAlergenos,
      preferencias: this.selPreferencias
    };
    this.usuarioService.editUsuario(localStorage.getItem('token'), this.usuario).subscribe((res: IResponse) => {
    });
  }
  darBaja() {
    // TODO llamada a servicio para dar de baja
   const idUser: string = localStorage.getItem('token');
    this._authService.logout();

  }

  selectedAlergeno(alergeno: string) {
    if (this.selectedAlergenos.includes(alergeno)) {
      this.selectedAlergenos.splice( this.selectedAlergenos.indexOf(alergeno), 1 );

    } else {
      this.selectedAlergenos.push(alergeno);
    }
  }
  selectedPreferencias(preferencias: string) {
    if (this.selPreferencias.includes(preferencias)) {
      this.selPreferencias.splice( this.selPreferencias.indexOf(preferencias), 1 );

    } else {
      this.selPreferencias.push(preferencias);
    }
  }
}
