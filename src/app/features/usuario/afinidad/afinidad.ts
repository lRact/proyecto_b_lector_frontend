import { Component, inject, signal, OnInit } from '@angular/core';
import { ResenaService } from '../services/resena.service';

@Component({
    selector: 'app-afinidad',
    standalone: true,
    templateUrl: './afinidad.html',
})
export class Afinidad implements OnInit {
    afinidades = signal<any[]>([]);

    private resenaService = inject(ResenaService);

    ngOnInit(): void {
        this.cargarAfinidades();
    }

    cargarAfinidades(): void {
        this.resenaService.getAfinidades().subscribe({
            next: (data: any[]) => {
                this.afinidades.set(data);
            },
            error: (err) => {
                const error = err.error?.message ? err.error.message.toString() : err.message;
                console.error(error);
            },
        });
    }

    convertirEstrellas(rating: number): string {
        return '⭐'.repeat(rating);
    }
}
