import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {

  isTokenValid!: boolean;

  constructor( private authService: AuthService,
    private router: Router ) {

    
  }

 

  canActivate():boolean {  
    
    if ( !this.authService.token ) { 
      return true;
    } else {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
  }

  
}
