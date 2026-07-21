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
        path: 'casino/home',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/casino/home/home').then((m) => m.CasinoHome),
          },
        ]
      },
      {
        path: 'sports/home',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/sports/home/home').then((m) => m.SportsHome),
      },
    ],
  },
];
