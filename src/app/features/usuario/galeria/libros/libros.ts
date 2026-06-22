import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LibrosService } from '../../../admin/services/libros.service';

@Component({
    selector: 'app-galeria',
    standalone: true,
    templateUrl: './libros.html',
    imports: [RouterLink],
})
export class Galeria {
    libros = signal<any[]>([]);
    count = signal<number>(0);

    private librosService = inject(LibrosService);

    ngOnInit(): void {
        this.cargarLibros();
    }

    cargarLibros(): void {
        this.librosService.getAll().subscribe({
            next: (lista: any[]) => {
                this.libros.set(lista);
            },
            error: (err: any) => {
                const error = err.error?.message ? err.error.message.toString() : err.message;
                console.error(error);
            },
        });
    }
}
