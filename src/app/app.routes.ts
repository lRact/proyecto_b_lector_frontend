import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('./shared/layout/layout').then(m => m.Layout),
        children: [
            {
                path: '',
                redirectTo: 'inicio',
                pathMatch: 'full',
            },
        ]
    },

    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then(m => m.Login),
    },

    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then(m => m.Register),
    },

    {
        path: '**',
        redirectTo: 'dashboard',
    }
];
