import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() isGestor = false;
  @Input() activate: Boolean = false;

  public lblActivo: String = 'Desactivar';
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
      this.lblActivo = 'Activar';
      } else {
      this.lblActivo = 'Desactivar';
      }
  }
}
