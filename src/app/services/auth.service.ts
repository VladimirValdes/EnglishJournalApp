import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { loginForm } from '../interfaces/loginForm.interface';
import { map, Observable } from 'rxjs';
import { User } from '../model/user.mode';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   public userToken: string = "";

  constructor( private http: HttpClient) { }

  login( formData: loginForm ): Observable< User > {
    return this.http.post< User >(`${ base_url }/auth/login`, formData )
                .pipe(
                  map( ( res: User) => {
                    this.saveToken( res.token );
                      return res;
                  })
                )
  }

 

  private readToken(): string {
    return ( localStorage.getItem('x-token')) 
            ? this.userToken = localStorage.getItem('x-token') || '' 
            : this.userToken = '';
  }

  private saveToken( token: string ) {
    this.userToken = token;

    localStorage.setItem('x-token', token );

  }
}
