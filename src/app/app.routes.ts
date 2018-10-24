import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestorComponent } from './gestor/gestor.component';
import { PagesComponent } from './pages/pages.component';
import { ChatsComponent } from './chats/chats.component';

const newLocal = 'full';
const pagesRoutes: Routes = [
        { path: 'login', component: LoginComponent, data: { titulo: 'Dashboard' }  },
        { path: 'registro', component: DashboardComponent, data: { titulo: 'Dashboard' }  },
        { path: 'gestor', component: GestorComponent, data: { titulo: 'Gestor' }  },
        { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' }},
        { path: 'pages', component: PagesComponent, data: { titulo: 'Pagina' }  },
        { path: 'chats', component: ChatsComponent, data: { titulo: 'Pagina' }  },
        { path: '', redirectTo: '/dashboard', pathMatch: newLocal}
];

export const PAGES_ROUTES = RouterModule.forRoot(pagesRoutes, { useHash: true });

