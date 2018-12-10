import {Component, OnInit, OnDestroy } from '@angular/core';
import {Router } from '@angular/router';
import { ILogin } from '../login';
import { AuthService } from '../auth.service';
import { UsuariosService } from '../services/usuarios.service';
import { IResponse } from '../registro/registro.component';
import { AnunciosService } from '../services/anuncios.service';

@Component( {
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

public login: ILogin;
public errores: String[] = [];
public subs;
constructor(private _router: Router, public authService: AuthService,
    private userService: UsuariosService, private _anuncios: AnunciosService) {

}

ngOnInit() {
    this.login = {
        userid: '',
        password: ''
    };
    this.authService.logout();
}
ngOnDestroy () {
    //this.subs.unsubscribe();
}
doLogin(mail: string, pass: string): void {
    this.login = {
        userid : mail,
        password: pass
    };


    if (this.validate()) {
        this._router.navigate(['/dashboard']);
    }
}
public validate(): boolean {
    this.errores = [];
    let error = false;
    if (this.login.userid === '') {
        error = false;
        this.errores.push('El campo email no puede estar vacío');
    }
    if (this.login.password === '') {
        error = false;
        this.errores.push('El campo password no puede estar vacío');
    }
    // TODO comprobar que el usuario existe y que la contraseña es correcta

    // tslint:disable-next-line:no-shadowed-variable
    this.userService.checkPassword(this.login.userid, this.login.password).subscribe( (data:  IResponse) => {
        error = data.ok;

    if (error) {

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', this.login.userid);
        this.subs =  this._anuncios.getPlatoRecomendados(localStorage.getItem('token')).subscribe((response: IResponse) => {
              window.alert('Alerta!! Los siguiente platos te podrían interesar: \n' + response.platos);
            });
        this._router.navigate(['/dashboard']);

        } else {
            this.errores.push('El usuario o contraseña no son válidos');

        }

    });
    return true;
    }
}


