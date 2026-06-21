import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);
    private apiUrl = `${ environment.apiUrl }/auth`;

    getAll(): Observable<any[]> {
        return this.http.get<any>(this.apiUrl);
    }

    register(nombre: string, email: string, password: string, rol: string): Observable<any> {
        return this.http.post<any>(`${ this.apiUrl }/register`, { nombre, email, password, rol });
    }

    login(email: string, password: string): Observable<{ accessToken: string }> {
        return this.http
            .post<{ accessToken: string }>(`${ this.apiUrl }/login`, { email, password })
            .pipe(
                tap((response) => {
                    localStorage.setItem('accessToken', response.accessToken);
                }),
            );
    }

    logout(): void {
        localStorage.removeItem('accessToken');
    }
}
