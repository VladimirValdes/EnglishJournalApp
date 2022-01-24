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

    if ( !this.authService.token ) { 
      console.log('can I pass to login');
      return true;
    } else {
      console.log('can not I pass to login');

      this.router.navigateByUrl('/dashboard');
      return false;
    }
  }
  
}
