import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Verbs } from '../interfaces/verbs.interface';
import { AuthService } from './auth.service';

const BASE_URL = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class VerbsService {

  constructor( 
    private http: HttpClient,
    private auth: AuthService ) { }

  getVerbs():Observable<Verbs[]> {
    return this.http.get<Verbs[]>(`${ BASE_URL }/verbs/user`);
  }
}
