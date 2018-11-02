import {Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';

@Component( {
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

public login: Login;
constructor(private _router: Router) {

}

ngOnInit() {
    this.login = {
        email: '',
        password: ''
    };

}
doLogin(mail: string, pass: string): void {
    this.login = {
        email: mail,
        password: pass
    };
    console.log(this.login);

    if (this.validate()) {
        this._router.navigate(['/dashboard']);
    }
}
public validate(): boolean {
    let error = true;
    if (this.login.email === '') {
        error = false;
    }
    if (this.login.password === '') {
        error = false;
    }
    console.log(error);
    
    // TODO comprobar que el usuario existe y que la contraseña es correcta
    return error;
}
}

export interface Login {
    email: String;
    password: String;
}
