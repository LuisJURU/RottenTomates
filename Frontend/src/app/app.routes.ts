import { Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard'; // Asegúrate de importar el guard de autenticación

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'moviedetailpage/:id', // Asegúrate de que la ruta acepte un parámetro `id`
    loadComponent: () => import('./moviedetailpage/moviedetailpage.page').then(m => m.MoviedetailpagePage),
  },  {
    path: 'favorites',
    loadComponent: () => import('./favorites/favorites.page').then( m => m.FavoritesPage)
  },

];