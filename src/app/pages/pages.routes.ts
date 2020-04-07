import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { UserComponent } from './user/user.component';
import { ProductosComponent } from './productos/productos.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

import { AuthGuardService } from '../services/auth-guard.service';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    //canActivate: [LoginGuardGuard],
    children: [
      { path: 'watchlist', component: WatchlistComponent, data: { titulo: 'Portfolio' }, canActivate: [AuthGuardService] },
      { path: 'user', component: UserComponent, data: { titulo: 'User' }, canActivate: [AuthGuardService] },
      { path: 'productos', component: ProductosComponent, data: { titulo: 'Symbols' }, canActivate: [AuthGuardService] },
      { path: 'movimientos', component: MovimientosComponent, data: { titulo: 'Lots' }, canActivate: [AuthGuardService] },
      { path: 'login', component: LoginComponent, data: { titulo: 'Login' } },
      { path: 'register', component: RegisterComponent, data: { titulo: 'Register' } },
      { path: 'watchlist/:id', component: WatchlistComponent, data: { titulo: 'Portfolio' } },
      { path: 'movimientos/:id', component: MovimientosComponent, data: { titulo: 'Portfolio' } },
      { path: '', redirectTo: '/login', pathMatch: 'full' }

    ]
  }
]
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
