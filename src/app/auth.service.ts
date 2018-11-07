import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public _routes: Router) { }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    this._routes.navigate(['/login']);

  }
}
