import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('accessToken');

    if(token) {
        const query = req.clone({
            setHeaders: {
                Authorization: `Bearer ${ token }`
            }
        });

        return next(query);
    }

    return next(req);
}