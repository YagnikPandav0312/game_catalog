import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout').then((m) => m.Layout),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'home/:type',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'home/:type/:slug',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
    ],
  },
];
