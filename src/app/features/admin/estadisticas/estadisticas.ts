import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { LibrosService } from '../services/libros.service';

@Component({
    selector: 'app-admin-estadisticas',
    standalone: true,
    templateUrl: './estadisticas.html',
})
export class Estadisticas {
    totalUsuarios = signal<number>(0);
    totalLibros = signal<number>(0);
    promedioRating = signal<number>(0);

    private authService = inject(AuthService);
    private librosService = inject(LibrosService);

    ngOnInit() {
        this.cargarEstadisticas();
    }

    cargarEstadisticas(): void {
        this.authService.getAll().subscribe({
            next: (usuarios: any) => {
                this.totalUsuarios.set(usuarios.length);
            },
            error: (err) => {
                const error = err.error?.message ? err.error.message.toString() : err.message;
                console.error(error);
            }
        });

        this.librosService.getAll().subscribe({
            next: (libros: any) => {
                this.totalLibros.set(libros.length);
            },
            error: (err) => {
                const error = err.error?.message ? err.error.message.toString() : err.message;
                console.error(error);
            }
        })
    }
}
