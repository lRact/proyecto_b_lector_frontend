import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { authAdminGuard } from './core/guards/auth-admin.guard';

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

            {
                path: 'forbidden',
                loadComponent: () => import('./features/forbidden/forbidden').then(m => m.Forbidden),
            },

            {
                path: 'estadisticas',
                canActivate: [authAdminGuard],
                loadComponent: () => import('./features/admin/estadisticas/estadisticas').then(m => m.Estadisticas),
            },

            {
                path: 'gestion',
                canActivate: [authAdminGuard],
                loadComponent: () => import('./features/admin/gestion-libros/gestion').then(m => m.Gestion),
            },

            {
                path: 'agregar',
                canActivate: [authAdminGuard],
                loadComponent: () => import('./features/admin/agregar-libros/agregar').then(m => m.AgregarLibros),
            }
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
