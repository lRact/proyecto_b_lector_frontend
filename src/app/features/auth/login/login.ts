import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    standalone: true,
    imports: [FormsModule, RouterLink],
})
export class Login {
    email: string = '';
    password: string = '';

    message = signal<string>('');

    private authService = inject(AuthService);
    private router = inject(Router);

    onSubmit(): void {
        if(!this.email || !this.password) {
            this.message.set('Completa todos los campos.');
            return;
        }

        this.authService.login(this.email, this.password).subscribe({
            next: () => {
                console.log('Inicio de sesión completado.');
                this.router.navigate(['/dashboard']);
            },
            error: err => {
                const error = err.error?.message ? err.error.message.toString() : err.message;
                console.error(error);
                this.message.set(error);
            }
        });
    }
}