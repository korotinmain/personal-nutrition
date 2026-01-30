import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { unauthGuard } from './core/auth/unauth.guard';

export const routes: Routes = [
  // Public routes (only for unauthenticated users)
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login.page').then((m) => m.LoginPage),
    canActivate: [unauthGuard],
  },
  {
    path: 'auth/callback',
    loadComponent: () => import('./features/auth/pages/callback.page').then((m) => m.CallbackPage),
  },

  // Protected routes (requires JWT token from Supabase)
  {
    path: '',
    loadComponent: () =>
      import('./shared/layout/app-shell/app-shell.component').then((m) => m.AppShellComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/pages/home.page').then((m) => m.HomePage),
      },
    ],
  },

  // Redirect unknown paths to home
  {
    path: '**',
    redirectTo: '',
  },
];
