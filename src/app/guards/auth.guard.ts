import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CheckConnectionService } from '../services/check-connection.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {


  connection!:boolean;

  constructor( private  authService: AuthService,
    private router: Router,
    private checkConnectionService: CheckConnectionService) {

    checkConnectionService.checkConnection$().pipe(
      tap( connection => {
        this.connection = connection;        
      }),
    ).subscribe();
    
  }

  canLoad(): Observable<boolean> {
    return this.isAuthenticate();
  }

  canActivate(): Observable<boolean> {
    return this.isAuthenticate();
  }


  isAuthenticate():Observable<boolean> {

    if ( !this.connection ) {
      this.checkConnection(); 
    }

    return  this.authService.validateToken().pipe(
      tap( isAuthentication  => {
        if ( !isAuthentication ) { this.router.navigateByUrl('/login'); }
      }),
    );

  }


  
  checkConnection(): boolean {
    this.checkConnectionService.showAlertConnection(this.connection);
    this.router.navigateByUrl('/login');
    console.log('connection', this.connection);
    return this.connection;
  }

  
}
