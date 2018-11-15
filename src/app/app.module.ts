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
import { IncremenatadorComponent } from './controls/incrementador/incremenatador.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from './shared/card/card.component';
import { GestorComponent } from './gestor/gestor.component';
import { PagesComponent } from './pages/pages.component';
import { ChatsComponent } from './chats/chats.component';
import { RegistroComponent } from './registro/registro.component';
import { MessagesComponent } from './controls/messages/messages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuard } from './auth.guard';
import { UsuariosService } from './services/usuarios.service';
import { AnunciosService } from './services/anuncios.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    SidebarComponent,
    IncremenatadorComponent,
    CardComponent,
    GestorComponent,
    PagesComponent,
    ChatsComponent,
    RegistroComponent,
    MessagesComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    PAGES_ROUTES
  ],
  providers: [
    AuthGuard,
    UsuariosService,
    AnunciosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
