import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-forbidden',
    templateUrl: './forbidden.html',
    standalone: true,
})
export class Forbidden {
    private router = inject(Router);

    volver(): void {
        this.router.navigate(['/dashboard/inicio']);
    }
}
