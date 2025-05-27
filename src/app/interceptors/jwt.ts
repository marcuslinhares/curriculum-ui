import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {

        const token = localStorage.getItem('auth_token');
        console.log('Adicionando token: intercept', token);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('auth_token');
        console.log('Adicionando token: intercept', token);


        const isAuthentication = req.url.includes('/autenticacao');
        const isUserPost = req.url.includes('/usuarios') && req.method === 'POST';

        if (!isAuthentication && !isUserPost) {
            console.log('Adicionando token:', token);
            const cloned = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next.handle(cloned);
        }

        return next.handle(req);
    }
}
