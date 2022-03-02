import {  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  catchError, map, Observable, switchMap, throwError  } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

const BASE_URL = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class HeadersInterceptor implements HttpInterceptor{


 

  constructor( private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    const routesWithoutToken = [
      `${ BASE_URL }/auth/login`,
      `${ BASE_URL }/auth/refreshtoken`,
    ];

    const reqClone = this.attachToken(req, this.authService.token);


    if ( routesWithoutToken.includes( req.url )) {
      return next.handle( req );
    }

  
    return next.handle( reqClone ).pipe(
      catchError( err  => {

        const msg = err.error.msg;

        if ( err instanceof HttpErrorResponse && err.status === 401 && msg === 'Token has expired') {
          console.log(err.error.msg);
          console.log(this.authService.userRefreshToken);
          // return err;
          return this.handle401Error( req, next);
        }
        return this.showErrors(err);
      }),
    );
    
  }

  showErrors( error: HttpErrorResponse ):Observable<any> {    

    const errorMessage = new Error(error.error.msg);
    return throwError(() => errorMessage);

  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.refreshToken()
      .pipe(
        map( res => this.attachToken(req, res.token)),
        // eslint-disable-next-line @typescript-eslint/no-shadow
        switchMap(req => next.handle(req)),
      );
  }

  private attachToken(req: HttpRequest<any>, token: string ): HttpRequest<any> {
    return req.clone({ setHeaders: { 'x-token': token } });
  }

 

  


  
}
