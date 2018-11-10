import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private route: ActivatedRoute) {
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
    //TODO llamar a back con porciones seleccionadas y producto

  }

}
