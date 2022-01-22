import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class errorsInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError( ( error: HttpErrorResponse ) => {
                let errorMsj = '';

                if ( error instanceof HttpErrorResponse) {
                    const msg = error.error.msg;
                    errorMsj = `Client-side error: ${error.error.msg}`;
                }

                return throwError( () =>  new Error( `Error response: ${ errorMsj }`));
            })
        )
    }


}