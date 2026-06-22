import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LibrosService } from '../../../admin/services/libros.service';
import { ResenaService } from '../../services/resena.service';

@Component({
    selector: 'app-libro',
    standalone: true,
    templateUrl: './ver-libro.html',
    imports: [ReactiveFormsModule],
})
export class Libro {
    libro_id: number = 0;

    titulo = signal<string>('');
    autores = signal<string>('');
    editor = signal<string>('');
    generos = signal<string>('');
    sinopsis = signal<string>('');
    image_url = signal<string>('');
    puntuacion = signal<number>(0);
    id_resena = signal<number>(0);
    message = signal<string>('');

    resenaForm: FormGroup;

    private route = inject(ActivatedRoute);
    private librosService = inject(LibrosService);
    private resenaService = inject(ResenaService);
    private formBuilder = inject(FormBuilder);

    constructor() {
        this.resenaForm = this.formBuilder.group({
            rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
        });
    }

    ngOnInit(): void {
        this.libro_id = Number(this.route.snapshot.paramMap.get('id'));
        this.cargarLibro();
        this.cargarResena();
    }

    cargarLibro(): void {
        this.librosService.getById(this.libro_id).subscribe({
            next: (libro) => {
                this.titulo.set(libro.titulo);
                this.autores.set(libro.autores);
                this.editor.set(libro.editor);
                this.generos.set(libro.generos);
                this.sinopsis.set(libro.sinopsis);
                const rutaImagen = libro.image_url
                    ? `http://localhost:3000/uploads/${libro.image_url}`
                    : 'assets/img/missing_image.jpg';
                this.image_url.set(libro.image_url);
            },
            error: (err) => {
                const error = err.error?.message ? err.error.message.toString() : err.message;
                console.error(error);
            },
        });
    }

    cargarResena(): void {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            return;
        }

        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const idUsuario = tokenPayload.userId;

        this.resenaService.getByLibro(this.libro_id).subscribe({
            next: (resenas: any[]) => {
                const miResena = resenas.find((r) => r.usuario.id === idUsuario);

                if (miResena) {
                    this.puntuacion.set(miResena.rating);
                    this.id_resena.set(miResena.id_resena);
                }
            },
            error: (err) => {
                const error = err.error?.message ? err.error.message.toString() : err.message;
                console.error(error);
            },
        });
    }

    crearResena(): void {
        if (this.resenaForm.invalid) {
            return;
        }

        const token = localStorage.getItem('accessToken');

        if (!token) {
            return;
        }

        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const idUsuario = tokenPayload.userId;

        const payload = {
            libro_id: this.libro_id,
            rating: Number(this.resenaForm.get('rating')?.value),
            usuario_id: idUsuario,
        };

        this.resenaService.create(payload).subscribe({
            next: () => {
                this.cargarResena();
            },
            error: (err) => {
                const error = err.error?.message ? err.error.message.toString() : err.message;
                console.error(error);
            },
        });
    }

    eliminarResena(): void {
        const id = this.id_resena();
        if (!id) return;

        if (confirm(`¿Estás seguro de eliminar tu reseña para este libro?`)) {
            this.resenaService.delete(id).subscribe({
                next: () => {
                    this.puntuacion.set(0);
                    this.id_resena.set(0);
                },
                error: (err: any) => {
                    const error = err.error?.message ? err.error.message.toString() : err.message;
                    console.error(error);
                },
            });
        }
    }
}
