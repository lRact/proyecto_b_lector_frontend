import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LibrosService } from '../services/libros.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-gestion',
    templateUrl: './gestion.html',
    standalone: true,
    imports: [RouterLink],
})
export class Gestion {
    libros = signal<any[]>([]);

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
            }
        });
    }

    eliminarLibro(id: number): void {
        if(confirm(`¿Estas seguro de eliminar este libro? ID: ${ id }`)) {
            this.librosService.delete(id).subscribe({
                next: () => {
                    this.libros.update(acts => acts.filter((i) => i.id_libro !== id));
                },
                error: (err: any) => {
                    const error = err.error?.message ? err.error.message.toString() : err.message;
                    console.error(error);
                }
            });
        }
    }
}
