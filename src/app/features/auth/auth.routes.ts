import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'callback',
    loadComponent: () => import('./pages/callback.page').then((m) => m.CallbackPage),
  },
];
