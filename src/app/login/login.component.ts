import {Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { ILogin } from '../login';
import { AuthService } from '../auth.service';
import { UsuariosService } from '../services/usuarios.service';
import { IResponse } from '../registro/registro.component';

@Component( {
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

public login: ILogin;
public errores: String[] = [];
constructor(private _router: Router, public authService: AuthService, private userService: UsuariosService) {

}

ngOnInit() {
    this.login = {
        userid: '',
        password: ''
    };
    this.authService.logout();
}
doLogin(mail: string, pass: string): void {
    this.login = {
        userid : mail,
        password: pass
    };
    console.log(this.login);

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
        console.log(error);

    if (error) {

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', this.login.userid);
        this._router.navigate(['/dashboard']);

        }

    });
    return true;
    }
}


