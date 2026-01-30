import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home.page').then((m) => m.HomePage),
  },
];
