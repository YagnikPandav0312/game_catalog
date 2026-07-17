import { Routes } from '@angular/router';

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
        loadComponent: () => import('./pages/casino/home/home').then((m) => m.CasinoHome),
      },
      {
        path: 'sports/home',
        loadComponent: () => import('./pages/sports/home/home').then((m) => m.SportsHome),
      },
    ],
  },
];
