import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { IAnuncio } from '../gestor/gestor.component';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public alergenos: string [] = [];

  public registro: IUsuario;
  public errores: string [] = [];
  constructor (private usuarioService: UsuariosService) { }
  ngOnInit() {
    this.alergenos.push('Lactosa');
    this.alergenos.push('Celiaco');

    this.registro = {
      nombre: '',
      password: '',
      email: '',
      contacto: 0,
      ciudad: '',
      alergenos: [],
    };
  }
  save(nombre: string, password: string, email: string, contacto: number, ciudad: string) {
    console.log(contacto);
    if (!contacto) {
      contacto = 0;
    }
    this.registro = {
      nombre: nombre,
      password: password,
      email: email,
      contacto: contacto,
      ciudad: ciudad,
      alergenos: [],
    };
    this.validate();
    if (this.errores.length === 0) {
      this.usuarioService.addUsuario(this.registro).subscribe((res: IResponse) => {
        console.log(res);

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

}

export interface IUsuario {
  nombre: string;
  password: string;
  email: string;
  contacto: number;
  ciudad: string;
  alergenos?: string[];
}
export interface IResponse {
  ok: boolean;
  boody: string;
  platos?;
}
