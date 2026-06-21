import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibrosService } from '../services/libros.service';

@Component({
    selector: 'app-agregar-libros',
    standalone: true,
    templateUrl: './agregar.html',
    imports: [RouterLink, ReactiveFormsModule]
})
export class AgregarLibros {
    libroForm: FormGroup;
    portada: File | null = null;

    message = signal<string>('');

    private formBuilder = inject(FormBuilder);
    private router = inject(Router);
    private librosService = inject(LibrosService);

    constructor() {
        this.libroForm = this.formBuilder.group({
            titulo: ['', Validators.required],
            autores: ['', Validators.required],
            editor: ['', Validators.required],
            generos: ['', Validators.required],
            sinopsis: ['', [Validators.required, Validators.minLength(10)]],
        });
    }

    onFileChange(e: any): void {
        const file = e.target.files[0];
        if(file) {
            this.portada = file;
            const label = e.target.nextElementSibling;
            if(label) {
                label.innerText = file.name;
            }
        }
    }

    onSubmit(): void {
        if(this.libroForm.invalid || !this.portada) {
            this.message.set('Completa todos los campos');
            return;
        }

        const formData = new FormData();

        formData.append('titulo', this.libroForm.get('titulo')?.value);
        formData.append('editor', this.libroForm.get('editor')?.value);
        formData.append('sinopsis', this.libroForm.get('sinopsis')?.value);
        formData.append('autores', this.libroForm.get('autores')?.value);
        formData.append('generos', this.libroForm.get('generos')?.value);
        formData.append('image', this.portada);

        this.librosService.create(formData).subscribe({
            next: () => {
                console.log('Libro añadido.');
                this.router.navigate(['/dashboard/gestion']);
            },
            error: err => {
                const error = err.error?.message ? err.error.message.toString() : err.message;
                this.message.set(error);
                console.error(error);
            }
        })
    }
}
