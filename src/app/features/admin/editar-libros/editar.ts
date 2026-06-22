import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibrosService } from '../services/libros.service';

@Component({
    selector: 'app-admin-editar',
    standalone: true,
    templateUrl: './editar.html',
    imports: [RouterLink, ReactiveFormsModule],
})
export class Editar {
    id_libro: number = 0;
    libroForm: FormGroup;
    portada: File | null = null;

    message = signal<string>('');

    private formBuilder = inject(FormBuilder);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
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

    ngOnInit(): void {
        this.id_libro = Number(this.route.snapshot.paramMap.get('id'));
        this.cargarLibro();
    }

    onFileChange(e: any): void {
        const file = e.target.files[0];
        if (file) {
            this.portada = file;
            const label = e.target.nextElementSibling;
            if (label) {
                label.innerText = file.name;
            }
        }
    }

    onSubmit(): void {
        if (this.libroForm.invalid || !this.portada) {
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

        this.librosService.update(this.id_libro, formData).subscribe({
            next: () => {
                console.log(`Libro ${ this.id_libro } editado.`);
                this.router.navigate(['/dashboard/gestion']);
            },
            error: (err) => {
                const error = err.error?.message ? err.error.message.toString() : err.message;
                this.message.set(error);
                console.error(error);
            },
        });
    }

    cargarLibro(): void {
        this.librosService.getById(this.id_libro).subscribe({
            next: (libro) => {
                this.libroForm.patchValue({'titulo': libro.titulo});
                this.libroForm.patchValue({'editor': libro.editor});
                this.libroForm.patchValue({'sinopsis': libro.sinopsis});
                this.libroForm.patchValue({'autores': libro.autores});
                this.libroForm.patchValue({'generos': libro.generos});
            },
            error: (err) => {
                const error = err.error?.message ? err.error.message.toString() : err.message;
                console.error(error);
            }
        });
    }
}
