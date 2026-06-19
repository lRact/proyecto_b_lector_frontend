import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.html',
    imports: [RouterOutlet, RouterLink],
})
export class Layout {
    nombreUsuario: string = '';
    rolUsuario: string = '';

    private router = inject(Router);

    ngOnInit() {
        const token = localStorage.getItem('accessToken');

        if(!token) {
            this.nombreUsuario = 'Usuario';
            return;
        }

        const payload = JSON.parse(atob(token.split('.')[1]));

        this.nombreUsuario = payload.nombre;
        this.rolUsuario = payload.rol;
    }

    logout(): void {
        localStorage.removeItem('accessToken');
    }
}
