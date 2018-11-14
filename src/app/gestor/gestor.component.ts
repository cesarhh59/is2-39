import { Component, OnInit } from '@angular/core';
import { AnunciosService } from '../services/anuncios.service';
import { IResponse } from '../registro/registro.component';

@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.component.css']
})
export class GestorComponent implements OnInit {
  public options: string[] = [];
  public activo: Boolean = false;
  constructor(private platosService: AnunciosService) { }

  ngOnInit() {
    this.platosService.getPlatosPropietario(localStorage.getItem('token')).subscribe((res: IResponse) => {
    this.options.push(res.platos);
    });
  }

saveAlergeno(alergeno: any) {

  }
  saveAnuncio(titulo: string, porciones: number, localizacion: string) {
    const anuncio: IAnuncio = {
      titulo: titulo,
      porciones: porciones,
      localizacion: localizacion,
      disponibles: true,
      propietario: localStorage.getItem('token'),
      estado: false,
      valoracion: 0
    };
    this.platosService.addPlato(anuncio).subscribe((res: IResponse) => {
      console.log(res);
    });
  }
}

export interface IAnuncio {
  titulo: String;
  valoracion: number;
  propietario: string;
  porciones: number;
  disponibles: boolean;
  alergenos?: string [];
  localizacion: string;
  hiloMensajes?: string[];
  estado: boolean;
}
