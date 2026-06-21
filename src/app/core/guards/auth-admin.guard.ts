import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authAdminGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const token = localStorage.getItem('accessToken');

    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));

        if(payload.rol == 'admin') {
            return true;
        }

        router.navigate(['/dashboard/forbidden']);
        return false;
    }

    router.navigate(['/login']);
    return false;
};
