import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AnunciosService } from '../../services/anuncios.service';
import { IResponse } from '../../registro/registro.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() title: string;
  @Input() items: String[] = [];
  @Output() itemSelected: EventEmitter < string >  = new EventEmitter();
  constructor(public _routes: Router) { }

  ngOnInit() {}
  navegarChat(item: string) {
  this._routes.navigate([item]);
  }

  select(item: string) {
  this.itemSelected.emit(item);
  }
}
