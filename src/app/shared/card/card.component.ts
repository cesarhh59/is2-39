import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  this.changelblActivo();
  }
  onClick(event: Event) {
//    this.click.emit(event);
  this.activate = !this.activate;
  this.changelblActivo();
  }

  changelblActivo(): void {
    if (this.activate) {
      this.lblActivo = 'Activo';
      } else {
      this.lblActivo = 'Desactivado';
      }
  }
}
