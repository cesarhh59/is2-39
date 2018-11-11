import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAnuncio } from '../gestor/gestor.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  public anuncio: IAnuncio = {
    titulo: '',
    porciones: 0,
    localizacion: '',
    disponibles: false,
    propietario: '',
    estado: false,
    valoracion: 0
  };

  public showValoracion: Boolean = false;
  public valoracion: Number = 0;
  public porcionesSeleccionadas = 0;
  constructor(private route: ActivatedRoute, private routes: Router) {
    console.log(this.anuncio);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
    console.log(params['id']);
    });
    // TODO llamar servicio para recuperar datos de anuncio

    this.anuncio = {
      titulo: 'Magdalenas',
      porciones: 4,
      localizacion: 'Madrid',
      disponibles: true,
      propietario: 'Jose',
      estado: true,
      valoracion: 4.1
    };
  }

  comprar(): void {
    // TODO llamar a back con porciones seleccionadas y producto

    this.showValoracion = !this.showValoracion;
  }
  enviar() {
    this.showValoracion = !this.showValoracion;
    // TODO llamar a back con porciones seleccionadas y producto
    this.routes.navigate(['dashboard']);
  }

}
