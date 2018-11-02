import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.component.css']
})
export class GestorComponent implements OnInit {
  public options: string[] = [];
  public activo: Boolean = false;
  constructor() { }

  ngOnInit() {
  }
}
