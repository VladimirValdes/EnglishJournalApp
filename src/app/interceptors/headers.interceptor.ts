import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

const BASE_URL = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class HeadersInterceptor implements HttpInterceptor{


  constructor( private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    const loginRoute = `${ BASE_URL }/auth/login`;
    const headers = new HttpHeaders({
      'x-token': this.authService.token,
    });

    if ( req.url.indexOf(loginRoute) === -1 ) {
      const reqClone = req.clone({ headers });
      return next.handle( reqClone );
    }
    
    return next.handle( req );


  

    
    
  }


  
}
