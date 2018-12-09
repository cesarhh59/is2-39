import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { AuthGuard } from '../../auth.guard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public userName: string = localStorage.getItem('token');
  constructor(private _routes: Router, private authService: AuthService, public authGuard: AuthGuard) { }

  ngOnInit() {
  }
  logout(): void {
    this.authService.logout();
  }

}
