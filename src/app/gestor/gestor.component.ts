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
  public message: string [] = [];
  public typeMessage = 'danger';
  ngOnInit() {
    this.platosService.getPlatosPropietario(localStorage.getItem('token')).subscribe((res: IResponse) => {
    this.options.push(res.platos);
    });
  }

saveAlergeno(alergeno: any) {

  }
  saveAnuncio(titulo: string, porciones: number, localizacion: string) {
    this.message = [];
    if ( this.checkCampos(titulo, porciones, localizacion)) {
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
      });
      this.message.push('El plato se ha creado correctamente');
      this.typeMessage = 'success';
    }
  }
  checkCampos(titulo: string, porciones: number, localizacion: string): boolean {
    let result = true;
    if (titulo === '') {
      result = false;
      this.message.push('Indique el titulo del plato');
    }
    if (porciones.toString() === '' || porciones > 0) {
      result = false;
      this.message.push('El número de porciones no puede ser 0');
    }
    if ( localizacion === '') {
      result = false;
      this.message.push('Indique la localización del plato');
    }

    return result;

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
