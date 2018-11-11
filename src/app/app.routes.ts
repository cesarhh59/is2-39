import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestorComponent } from './gestor/gestor.component';
import { PagesComponent } from './pages/pages.component';
import { ChatsComponent } from './chats/chats.component';
import { RegistroComponent } from './registro/registro.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuard } from './auth.guard';

const newLocal = 'full';
const pagesRoutes: Routes = [
        { path: 'login', component: LoginComponent, data: { titulo: 'Dashboard' }},
        { path: 'registro', component: RegistroComponent, data: { titulo: 'Dashboard' } },
        { path: 'gestor', component: GestorComponent, data: { titulo: 'Gestor' }        , canActivate: [AuthGuard]},
        { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'}, canActivate: [AuthGuard]},
        { path: 'pages/:id', component: PagesComponent, data: { titulo: 'Pagina' }          , canActivate: [AuthGuard]},
        { path: 'chats', component: ChatsComponent, data: { titulo: 'Pagina' }          , canActivate: [AuthGuard]},
        { path: 'perfil', component: PerfilComponent, data: { titulo: 'Pagina' }        , canActivate: [AuthGuard]},
        { path: '', redirectTo: '/dashboard', pathMatch: newLocal}
];

export const PAGES_ROUTES = RouterModule.forRoot(pagesRoutes, { useHash: true });

