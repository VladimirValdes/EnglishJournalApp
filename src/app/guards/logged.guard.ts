import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {

  isTokenValid!: boolean;

  constructor( private authService: AuthService,
    private router: Router ) {

    this.checkToken();
    
  }

  // canLoad():boolean {
  //   // console.log( this.token );
  //   if ( !this.token ) { 
  //     return true;
  //   } else {
  //     this.router.navigateByUrl('/dashboard');
  //     return false;
  //   }
  // }

  canActivate():boolean {  

    if ( !this.authService.token  || !this.isTokenValid) { 
      console.log('can I pass to login');
      return true;
    } else {
      console.log('can not I pass to login');

      this.router.navigateByUrl('/dashboard');
      return false;
    }
  }

  checkToken() {
    this.authService.validateToken().pipe(
      tap( isAuthentication  => {
        this.isTokenValid = isAuthentication;
      }),
    );
  }
  
}
