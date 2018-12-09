import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAnuncio } from '../gestor/gestor.component';
import { AnunciosService } from '../services/anuncios.service';
import { IResponse } from '../registro/registro.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  public anuncio = {
    titulo: '',
    porciones: 0,
    localizacion: '',
    alergenos: [],
    disponibles: false,
    propietario: '',
    estado: false,
    valoracion: 0
  };

  public showValoracion: Boolean = false;
  public valoracion = 0;
  public porcionesSeleccionadas = 0;
  constructor(private route: ActivatedRoute, private routes: Router, private platosService: AnunciosService) {
  }

  ngOnInit() {


    // TODO llamar servicio para recuperar datos de anuncio
    this.route.params.subscribe(params => {
    this.platosService.getPlato(params['id']).subscribe((respuesta: IResponse) => {
      const auxAnuncio = respuesta.platos;
        this.anuncio = {
        titulo: auxAnuncio.titulo,
        porciones: auxAnuncio.porciones,
        localizacion: auxAnuncio.localizacion,
        alergenos: respuesta.platos.alergenos,
        disponibles: auxAnuncio.disponibles,
        propietario: auxAnuncio.propietario,
        estado: auxAnuncio.disponibles,
        valoracion: auxAnuncio.valoracion
      };
    });

    });

  }

  comprar(): void {
    // TODO llamar a back con porciones seleccionadas y producto
    this.platosService.comprarPlato(this.anuncio.titulo, this.porcionesSeleccionadas).subscribe((response: IResponse) => {
      console.log(response);
    });
    this.showValoracion = !this.showValoracion;
  }
  enviar() {
    this.showValoracion = !this.showValoracion;
    // TODO llamar a back con porciones seleccionadas y producto
    this.platosService.valorarPlato(this.anuncio.titulo, this.valoracion).subscribe((respuesta: IResponse) => {
    });
    this.routes.navigate(['dashboard']);
  }

}
