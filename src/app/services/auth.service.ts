import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/loginForm.interface';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { User } from '../model/user.mode';
import { RefreshToken, RenewToken } from '../interfaces/validateToken.interface';
import { Router } from '@angular/router';
import { AlertsService } from './alerts.service';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userToken: string = '';

  public userRefreshToken: string = '';

  public user!: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertsService) {
    this.readToken();
    this.readRefreshToken();
  }

  get token() {
    return this.readToken();
  }

  get uid() {
    return this.user.uid;
  }

  login(formData: LoginForm): Observable<User> {
    return this.http.post<User>(`${BASE_URL}/auth/login`, formData).pipe(
      map((res: User) => {
        this.saveToken(res.token);
        this.saveRefreshToken( res.refreshToken );
        return res;
      }),
      catchError( error => this.showError( error )),
    );
  }

  logout(){
    localStorage.removeItem('x-token');
    localStorage.removeItem('x-refreshToken');
    this.router.navigateByUrl('/login');
  }

  validateToken(): Observable<boolean> {
    return this.http
      .get<RenewToken>(`${BASE_URL}/auth/renew`)
      .pipe(
        map((resp: RenewToken) => {
          const { name, email, role, uid } = resp.user;

          this.user = new User(uid, name, email, role, resp.token, resp.refreshToken);
          this.saveToken(resp.token);
          this.saveRefreshToken(resp.refreshToken);
          
          return true;
        }),
        catchError(() => of(false)),
      );
  }

  refreshToken():Observable<RefreshToken>{
    const data = {
      refreshToken : this.userRefreshToken,
    };

    return this.http.post<RefreshToken>(`${BASE_URL}/auth/refreshtoken`, data )
      .pipe(
        tap( resp => {
          this.saveToken(resp.token);
          this.saveRefreshToken(resp.refreshToken);

          
          return resp;
        }),
      );
  }


  showError( error: any ) {

    const errorMessage = new Error(error.error.msg);
    this.alertService.error(errorMessage);
    return throwError(() => errorMessage);
    
  }

  private readToken(): string {
    return localStorage.getItem('x-token')
      ? (this.userToken = localStorage.getItem('x-token') || '')
      : this.userToken = '';
  }

  private readRefreshToken(): string {
    return localStorage.getItem('x-refreshToken')
      ? (this.userRefreshToken = localStorage.getItem('x-refreshToken') || '')
      : this.userRefreshToken = '';
  }

  private saveToken( token: string ) {
    this.userToken = token;
    
    localStorage.setItem('x-token', token);
  }

  private saveRefreshToken(refreshToken: string) {
    this.userRefreshToken = refreshToken;

    localStorage.setItem('x-refreshToken', refreshToken);
  }


}
