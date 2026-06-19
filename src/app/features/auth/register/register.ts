import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: 'register.html',
    standalone: true,
    imports: [FormsModule, RouterLink],
})
export class Register {
    nombre: string = '';
    email: string = '';
    password: string = '';
    confirmPassword: string = '';

    message = signal<string>('');

    private authService = inject(AuthService);
    private router = inject(Router);

    onSubmit():void {
        if(!this.nombre || !this.email || !this.password || !this.confirmPassword) {
            this.message.set('Completa todos los campos.');
            return;
        }

        if(this.password.length < 8 || this.confirmPassword.length < 8) {
            this.message.set('La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        if(this.password !== this.confirmPassword) {
            this.message.set('Las contraseñas no coinciden.');
            return;
        }

        const rol = 'usuario';

        this.authService.register(this.nombre, this.email, this.password, rol).subscribe({
            next: () => {
                console.log('Registro completado.');
                this.router.navigate(['/login']);
            },
            error: err => {
                const error = err.error?.message ? err.error.message.toString() : err.message;
                console.error(error);
                this.message.set(error);
            }
        });
    }
}