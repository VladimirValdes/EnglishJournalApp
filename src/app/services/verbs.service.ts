import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const BASE_URL = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class VerbsService {

  constructor( 
    private http: HttpClient,
    private auth: AuthService ) { }

  getVerbs() {
    return this.http.get(`${ BASE_URL }`);
  }
}
