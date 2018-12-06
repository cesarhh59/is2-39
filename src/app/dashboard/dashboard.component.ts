import { Component, OnInit } from '@angular/core';
import { IAnuncio } from '../gestor/gestor.component';
import { AnunciosService } from '../services/anuncios.service';
import { IResponse } from '../registro/registro.component';
import { element } from 'protractor';
import { FiltrosService } from '../services/filtros.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public anuncios: IAnuncio [] = [];
  public oAnuncios: IAnuncio [] = [];
  public filtros: string [] = [];
  public filtro = '';
  constructor(private platosService: AnunciosService, private _filtros: FiltrosService) { }
  ngOnInit() {
    this.filtros.push('Localización');
    this.filtros.push('Valoración');
    this.filtros.push('Preferencias');
    this.filtros.push('Alergenos');
    this.filtros.push('Más vendidos');


    // TODO llamada a servicios que devuelve los anuncios
    this.platosService.getPlatos().subscribe((data: IResponse) => {
    data.platos.forEach((e: IAnuncio) => {
      this.anuncios.push(e);
    });
    this.oAnuncios = this.anuncios;
    });
  }

  public  buscar(bOferta: string): void {
  let auxAnuncios: IAnuncio [];
  auxAnuncios = [];
  if (bOferta !== '') {
    this.anuncios.forEach(anuncio => {
      if (anuncio.titulo.includes(bOferta)) {
        auxAnuncios.push(anuncio);
      }
    });
    this.anuncios = auxAnuncios;
  } else {
    this.anuncios = this.oAnuncios;
  }
  }
  selectedItem(event) {
   this.filtro = event;
    switch (this.filtro) {
      case 'Alergenos':
            this._filtros.getAnunciosAlergenos('lactosa');
        break;
      default:
        break;
    }
  }
}
