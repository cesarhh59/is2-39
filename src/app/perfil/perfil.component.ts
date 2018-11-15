import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UsuariosService } from '../services/usuarios.service';
import { IUsuario, IResponse } from '../registro/registro.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public errores: string [] = [];
  public usuario: IUsuario;
  constructor(private _authService: AuthService, private usuarioService: UsuariosService) { }

  ngOnInit() {
  }

  editProfile(nombre: string, password: string, mail: string, ciudad: string, contacto: number) {
    this.usuario = {
      nombre: nombre,
      password: password ,
      email: mail,
      contacto: contacto,
      ciudad: ciudad,
      alergenos: [],
    };
    this.usuarioService.editUsuario(localStorage.getItem('token'),this.usuario).subscribe((res: IResponse) => {
    console.log(res);
    });
  }
  darBaja() {
    // TODO llamada a servicio para dar de baja
   const idUser: string = localStorage.getItem('token');
   console.log(idUser);
    this._authService.logout();

  }
}
