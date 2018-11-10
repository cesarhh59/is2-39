import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.component.css']
})
export class GestorComponent implements OnInit {
  public options: string[] = [];
  public activo: Boolean = false;
  constructor() { }

  ngOnInit() {
  }

saveAlergeno(alergeno: any) {
    console.log(alergeno);

  }
  saveAnuncio(titulo: string, porciones: number, localizacion: string) {

  }
}

export interface IAnuncio {
  título: String;
  valoración: number;
  propietario: string;
  porciones: number;
  disponibles: boolean;
  alergenos?: string [];
  localización: string;
  hiloMensajes?: string[];
  estado: boolean;
}
