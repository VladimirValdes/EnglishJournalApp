import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {

  token = this.authService.token;

  constructor( private authService: AuthService,
    private router: Router ) {
    
  }

  canLoad():boolean {
    if ( !this.token ) { 
      return true;
    } else {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
  }

  canActivate():boolean {  
    if ( !this.token ) { 
      return true;
    } else {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
  }
  
}
