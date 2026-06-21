import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LibrosService {
    private http = inject(HttpClient);
    private apiUrl = `${ environment.apiUrl }/libro`;

    getAll(): Observable<any[]> {
        return this.http.get<any>(this.apiUrl);
    }

    create(libro: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, libro);
    }

    update(id: number, libro: any): Observable<any> {
        return this.http.patch<any>(`${ this.apiUrl }/${ id }`, libro);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${ this.apiUrl }/${ id }`);
    }
}
