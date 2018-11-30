import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() title: string;
  @Input() items: String[] = [];
  constructor(public _routes: Router) {
    this.items.push('prueba1');
    this.items.push('prueba2');
  }

  ngOnInit() {
  }
  navegarChat(item: string) {
  this._routes.navigate([item]);
  }
}
