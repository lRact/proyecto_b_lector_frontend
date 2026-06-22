import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ResenaService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/resena`;

    getAll(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    getByLibro(idLibro: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/libro/${idLibro}`);
    }

    getByUserId(idUsuario: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/usuario/${idUsuario}`);
    }

    getAfinidades(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/afinidad/me`);
    }

    create(resena: any): Observable<any> {
        return this.http.post(this.apiUrl, resena);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
