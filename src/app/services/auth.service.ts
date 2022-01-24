import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/loginForm.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../model/user.mode';
import { RenewToken } from '../interfaces/validateToken.interface';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userToken: string = '';

  public user!: User;

  constructor(private http: HttpClient) {}

  get token() {
    return this.readToken();
  }

  login(formData: LoginForm): Observable<User> {
    return this.http.post<User>(`${BASE_URL}/auth/login`, formData).pipe(
      map((res: User) => {
        this.saveToken(res.token);
        return res;
      }),
    );
  }

  validateToken(): Observable<boolean> {
    return this.http
      .get<RenewToken>(`${BASE_URL}/auth/renew`, {
      headers: {
        'x-token': this.token,
      },
    })
      .pipe(
        map((resp: RenewToken) => {
          const { name, email, role, uid } = resp.user;

          this.user = new User(uid, name, email, role, resp.token);
          this.saveToken(resp.token);

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
