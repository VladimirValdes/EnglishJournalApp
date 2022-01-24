import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {


  constructor( private authService: AuthService,
    private router: Router ) {
    
  }

  canActivate( ) {
    const token = this.authService.token;
  
    if ( !token ) { 
      return true;
    } else {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
  }
  
}
