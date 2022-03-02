import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {


  connection!:boolean;

  constructor( private  authService: AuthService,
    private router: Router) {}


  canActivate(): Observable<boolean> {
    return this.isAuthenticate();
  }

  isAuthenticate():Observable<boolean> {

    return  this.authService.validateToken().pipe(
      tap( isAuthentication  => {   
        console.log({ isAuthentication });  
        if ( !isAuthentication ) { this.router.navigateByUrl('/login'); }
      }),
    );

  }
  


  
}
