import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/loginForm.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../model/user.mode';
import { RenewToken } from '../interfaces/validateToken.interface';
import { Router } from '@angular/router';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userToken: string = '';

  public user!: User;

  constructor(
    private http: HttpClient,
    private router: Router) {
    this.readToken();
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
        return res;
      }),
    );
  }

  logout(){
    localStorage.removeItem('x-token');
    this.router.navigateByUrl('/login');
  }

  validateToken(): Observable<boolean> {
    return this.http
      .get<RenewToken>(`${BASE_URL}/auth/renew`)
      .pipe(
        map((resp: RenewToken) => {
          const { name, email, role, uid } = resp.user;

          this.user = new User(uid, name, email, role, resp.token);
          this.saveToken(resp.token);
          console.log('Im in renewToken');
          
          return true;
        }),
        catchError(() => of(false)),
      );
  }

  private readToken(): string {
    return localStorage.getItem('x-token')
      ? (this.userToken = localStorage.getItem('x-token') || '')
      : (this.userToken = '');
  }

  private saveToken(token: string) {
    this.userToken = token;

    localStorage.setItem('x-token', token);
  }
}
