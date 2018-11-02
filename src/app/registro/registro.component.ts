import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public alergenos: string [] = [];

  private registro: Reigstro;
  private message: string [] = [];
  ngOnInit() {
    this.alergenos.push('Lactosa');
    this.alergenos.push('Celiaco');
  }
  validate(): void {
    if (this.registro) {
      if (this.registro.nombre) {
        this.message.push('El campo nombre no puede estar vacío');
      }
      if (this.registro.contraseña) {
        this.message.push('El campo contraseña no puede estar vacío');
      }
      if (this.registro.contacto) {
        this.message.push('El campo contacto no puede estar vacío');
      }
      if (this.registro.ciudad) {
        this.message.push('El campo ciudad no puede estar vacío');
      }
      if (this.registro.contacto) {
        this.message.push('El campo contacto no puede estar vacío');
      }
      if (this.message.length === 0) {
        this.message.push('El registro se ha realizado correctamente, por favor vaya a su correo para validar el usuario');
      }
}

export interface Reigstro {
  nombre: string;
  contraseña: string;
  email: string;
  ciudad: string;
  contacto: number;
  alergenos: string[];
}
