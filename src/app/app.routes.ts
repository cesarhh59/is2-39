import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';




const newLocal = 'full';
const pagesRoutes: Routes = [
        { path: 'login', component: LoginComponent, data: { titulo: 'Dashboard' }  },
        { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' }  },
        { path: '', redirectTo: '/dashboard', pathMatch: newLocal}
];

export const PAGES_ROUTES = RouterModule.forRoot(pagesRoutes, { useHash: true });

