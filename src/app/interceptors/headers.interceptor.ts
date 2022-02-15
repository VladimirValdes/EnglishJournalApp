import {  HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  catchError, Observable, tap, throwError  } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { CheckConnectionService } from '../services/check-connection.service';

const BASE_URL = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class HeadersInterceptor implements HttpInterceptor{


  connection!: boolean;

  constructor( private authService: AuthService,
    private checkConnectionService: CheckConnectionService) {
    checkConnectionService.checkConnection$().pipe(
      tap( connection => {
        if (!connection) {
          this.checkConnectionService.showAlertConnection(connection);
        }
      }),
    ).subscribe();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    const loginRoute = `${ BASE_URL }/auth/login`;
    const headers = new HttpHeaders({
      'x-token': this.authService.token,
    });

    if ( req.url.indexOf(loginRoute) === -1 ) {
      const reqClone = req.clone({ headers });
      return next.handle( reqClone );
    }

  
    return next.handle( req ).pipe(
      catchError( this.showErrors ),
    );
    
  }

  showErrors( error: HttpErrorResponse ):Observable<any> {    

    const errorMessage = new Error(error.error.msg);
    return throwError(() => errorMessage);

  }

 

 

  


  
}
