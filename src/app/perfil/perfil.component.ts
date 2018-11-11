import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public errores: string [] = [];
  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }
  darBaja() {
    //TODO llamada a servicio para dar de baja
   const idUser: string = localStorage.getItem('token');
   console.log(idUser);
    this._authService.logout();

  }
}
