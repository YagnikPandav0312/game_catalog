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
        path: 'casino',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/casino/home/home').then((m) => m.CasinoHome),
      },
      {
        path: 'casino/:slg',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/casino/home/home').then((m) => m.CasinoHome),
      },
      {
        path: 'sports',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/sports/home/home').then((m) => m.SportsHome),
      },
      {
        path: 'games-for-you',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/games-for-you/games-for-you').then((m) => m.GamesForYou),
      },
    ],

  },
];
