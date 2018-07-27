import { Injectable } from '../../../node_modules/@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '../../../node_modules/@angular/common/http';
import { Observable, throwError } from '../../../node_modules/rxjs';
import { catchError } from '../../../node_modules/rxjs/operators';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req).pipe(
            catchError(error => {
                //si existe un error verificamos de que tipo es para manejar el error.
                if (error instanceof HttpErrorResponse){
                    //Error de autorizacion
                    if (error.status === 401){
                        return throwError(error.statusText);
                    }    
                    //Error en la applicacion - API
                    const applicationError = error.headers.get('Application-Error');
                    if (applicationError){
                        console.error(applicationError);
                        return throwError(applicationError);
                    }
                    //Error en el server - validaciones en modelos, error servidor y demas.
                    const serveError = error.error;
                    let modalStateErrors='';
                    if (serveError && typeof serveError === 'object') {
                        for(const key in serveError){
                            if (serveError[key]){
                                modalStateErrors += serveError[key] + '\n';
                            }
                        }
                    }
                    return throwError(modalStateErrors || serveError || 'Server Error');
                }
            })
        );
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}