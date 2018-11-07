import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public errores: string [] = [];
  constructor() { }

  ngOnInit() {
  }
  darBaja() {
    //TODO llamada a servicio para dar de baja
  }
}
