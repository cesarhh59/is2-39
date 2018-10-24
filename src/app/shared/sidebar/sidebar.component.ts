import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() title: string;
  @Input() items: String[] = [];
  constructor() {
    this.items.push('prueba1');
    this.items.push('prueba2');
  }

  ngOnInit() {
  }

}
