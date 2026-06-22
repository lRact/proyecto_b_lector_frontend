import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ResenaService } from '../services/resena.service';

@Component({
    selector: 'app-resenas',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './resenas.html',
})
export class Resenas implements OnInit {
    resenas = signal<any[]>([]);
    private resenaService = inject(ResenaService);

    ngOnInit(): void {
        this.cargarMisResenas();
    }

    cargarMisResenas(): void {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const idUsuario = tokenPayload.userId;

        this.resenaService.getByUserId(idUsuario).subscribe({
            next: (lista: any[]) => {
                this.resenas.set(lista);
            },
            error: (err: any) => {
                const error = err.error?.message ? err.error.message.toString() : err.message;
                console.error(error);
            },
        });
    }

    convertirEstrellas(rating: number): string {
        return '⭐'.repeat(rating);
    }
}
