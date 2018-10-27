import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public alergenos: string [] = [];

  ngOnInit() {
    this.alergenos.push('Lactosa');
    this.alergenos.push('Celiaco');
  }

}
