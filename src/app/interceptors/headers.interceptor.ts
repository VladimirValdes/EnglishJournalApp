import {  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  catchError, map, Observable, switchMap, tap, throwError  } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { CheckConnectionService } from '../services/check-connection.service';

const BASE_URL = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class HeadersInterceptor implements HttpInterceptor{


  connection = navigator.onLine;

  constructor( private authService: AuthService,
    private checkConnectionService: CheckConnectionService) {
    checkConnectionService.checkConnection$().pipe(
      tap( connection => {
        console.log({ connection });
        
        if (!connection) {
          this.checkConnectionService.showAlertConnection(connection);
        }
      }),
    );

    

   
  }

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
        if ( err instanceof HttpErrorResponse && err.status === 401) {
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
