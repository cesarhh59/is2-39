import { Component, OnInit } from '@angular/core';
import { IAnuncio } from '../gestor/gestor.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public anuncios: IAnuncio [] = [];
  constructor() { }

  ngOnInit() {
    const anuncio = {
      titulo: 'Magdalenas',
      porciones: 4,
      localizacion: 'Madrid',
      disponibles: true,
      propietario: 'Jose',
      estado: true,
      valoracion: 4.1
    };
    this.anuncios.push(anuncio);
    this.anuncios.push(anuncio);
    // TODO llamada a servicios que devuelve los anuncios
  }

}
