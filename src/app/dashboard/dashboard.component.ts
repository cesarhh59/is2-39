import { Component, OnInit } from '@angular/core';
import { IAnuncio } from '../gestor/gestor.component';
import { AnunciosService } from '../services/anuncios.service';
import { IResponse } from '../registro/registro.component';
import { element } from 'protractor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public anuncios: IAnuncio [] = [];
  public oAnuncios: IAnuncio [] = [];
  constructor(private platosService: AnunciosService) { }
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
    const anuncio1 = {
      titulo: 'Perritos',
      porciones: 4,
      localizacion: 'Madrid',
      disponibles: true,
      propietario: 'Jose',
      estado: true,
      valoracion: 4.1
    };
    const anuncio2 = {
      titulo: 'Azulejos',
      porciones: 4,
      localizacion: 'Madrid',
      disponibles: true,
      propietario: 'Jose',
      estado: true,
      valoracion: 4.1
    };
    this.anuncios.push(anuncio);
    this.anuncios.push(anuncio);
    this.anuncios.push(anuncio1);
    this.anuncios.push(anuncio2);
    this.oAnuncios = this.anuncios;
    // TODO llamada a servicios que devuelve los anuncios
    this.platosService.getPlatos().subscribe((data: IResponse) => {
    console.log(data);
    data.platos.forEach((e: IAnuncio) => {
      this.anuncios.push(e);
    });
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
}
