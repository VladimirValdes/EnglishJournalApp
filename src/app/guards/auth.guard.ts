import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor( private  authService: AuthService,
    private router: Router) {
    
  }

  canLoad(): Observable<boolean> {
    return  this.authService.validateToken().pipe(
      tap( isAuthentication  => {
        if ( !isAuthentication ) { this.router.navigateByUrl('/login'); }
      }),
    );
  }

  canActivate(): Observable<boolean> {
    return  this.authService.validateToken().pipe(
      tap( isAuthentication  => {
        if ( !isAuthentication ) { this.router.navigateByUrl('/login'); }
      }),
    );
  }
  
}
