import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { IAnuncio } from '../gestor/gestor.component';
import { UsuariosService } from '../services/usuarios.service';
import { FiltrosService } from '../services/filtros.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public alergenos: string [] = [];
  public preferencias: string [] = [];

  public selectedAlergenos: string [] = [];
  public selPreferencias: string [] = [];

  public registro: IUsuario;
  public errores: string [] = [];
  constructor (private usuarioService: UsuariosService, private _filtros: FiltrosService) { }
  ngOnInit() {
    this.alergenos = this._filtros.getAlergenos();
    this.preferencias = this.usuarioService.preferencias;
    this.registro = {
      nombre: '',
      password: '',
      email: '',
      contacto: 0,
      ciudad: '',
      alergenos: this.selectedAlergenos
    };
  }
  save(nombre: string, password: string, email: string, contacto: number, ciudad: string) {
    if (!contacto) {
      contacto = 0;
    }
    this.registro = {
      nombre: nombre,
      password: password,
      email: email,
      contacto: contacto,
      ciudad: ciudad,
      alergenos: this.selectedAlergenos,
      preferencias: this.selPreferencias
    };
    this.validate();
    if (this.errores.length === 0) {
      this.usuarioService.addUsuario(this.registro).subscribe((res: IResponse) => {

      });
        this.errores.push('El registro se ha realizado correctamente, por favor vaya a su correo para validar el usuario');

    }
  }
  validate(): void {
    this.errores = [];
      if (this.registro.nombre === '') {
        this.errores.push('El campo nombre no puede estar vacío');
      }
      if (this.registro.password  === '') {
        this.errores.push('El campo contraseña no puede estar vacío');
      }
      if (this.registro.email  === '') {
        this.errores.push('El campo email no puede estar vacío');
      }
      if (this.registro.contacto  === 0) {
        this.errores.push('El campo contacto no puede estar vacío');
      }
      if (this.registro.ciudad  === '') {
        this.errores.push('El campo ciudad no puede estar vacío');
      }
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

export interface IUsuario {
  nombre: string;
  password: string;
  email: string;
  contacto: number;
  ciudad: string;
  alergenos?: string[];
  preferencias?: string[];
}
export interface IResponse {
  ok: boolean;
  body;
  platos?;
}
