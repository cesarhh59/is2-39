import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { PAGES_ROUTES } from './app.routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { IncremenatadorComponent } from './controls/incremenatador/incremenatador.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    SidebarComponent,
    IncremenatadorComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    PAGES_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
