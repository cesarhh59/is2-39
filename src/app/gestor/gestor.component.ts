import { Component, OnInit } from '@angular/core';
import { AnunciosService } from '../services/anuncios.service';
import { IResponse } from '../registro/registro.component';
import { FiltrosService } from '../services/filtros.service';

@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.component.css']
})
export class GestorComponent implements OnInit {
  public alergenos: string [] = [];
  public selectedAlergenos: string [] = [];

  public options: string[] = [];
  public activo: Boolean = false;
  constructor(private platosService: AnunciosService, private _filtros: FiltrosService) { }
  public message: string [] = [];
  public typeMessage = 'danger';
  ngOnInit() {
    this.alergenos = this._filtros.getAlergenos();

    this.platosService.getPlatosPropietario(localStorage.getItem('token')).subscribe((res: IResponse) => {
    this.options.push(res.platos);
    });
  }

  saveAnuncio(titulo: string, porciones: string, localizacion: string) {
    this.message = [];
    if ( this.checkCampos(titulo, porciones, localizacion)) {
      const anuncio: IAnuncio = {
        titulo: titulo,
        // tslint:disable-next-line:radix
        porciones: parseInt(porciones),
        localizacion: localizacion,
        disponibles: true,
        propietario: localStorage.getItem('token'),
        estado: false,
        valoracion: 0,
        alergenos: this.selectedAlergenos
      };
      this.platosService.addPlato(anuncio).subscribe((res: IResponse) => {
      });
      this.message.push('El plato se ha creado correctamente');
      this.typeMessage = 'success';
    }
  }
  checkCampos(titulo: string, porciones: string, localizacion: string): boolean {
    let result = true;
    if (titulo === '') {
      result = false;
      this.message.push('Indique el titulo del plato');
    }
    // tslint:disable-next-line:radix
    const porcion = parseInt(porciones);
    if (porciones.toString() === '' ) {

      result = false;
      this.message.push('Indique el número de porciones');
    } else if (porcion <= 0) {

      result = false;
      this.message.push('El número de porciones no puede ser 0');

    }
    if ( localizacion === '') {
      result = false;
      this.message.push('Indique la localización del plato');
    }

    return result;

  }
  selectedAlergeno(alergeno: string) {
    if (this.selectedAlergenos.includes(alergeno)) {
      this.selectedAlergenos.splice( this.selectedAlergenos.indexOf(alergeno), 1 );

    } else {
      this.selectedAlergenos.push(alergeno);
    }

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
