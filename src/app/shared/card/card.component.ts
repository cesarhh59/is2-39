import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AnunciosService } from '../../services/anuncios.service';
import { IResponse } from '../../registro/registro.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() title = 'titulo';
  @Input() porciones = 1;
  @Input() isGestor = false;
  @Input() activate: Boolean = false;

  public lblActivo: String = 'Desactivado';
  constructor(private anuncioService: AnunciosService) { }

  ngOnInit() {
  this.anuncioService.getPlato(this.title).subscribe((resultado: IResponse) => {
      this.activate = resultado.platos.estado;
      this.changelblActivo();
  });
  }
  onClick(event: Event) {
//    this.click.emit(event);
  this.activate = !this.activate;
  this.changelblActivo();
  }

  changelblActivo(): void {
    if (this.activate) {
      this.lblActivo = 'Activo';
      this.anuncioService.activarAnuncio(this.title);

      } else {
      this.lblActivo = 'Desactivado';
      this.anuncioService.desactivarAnuncio(this.title);
    }
  }
}
