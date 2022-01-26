import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Verb, Verbs } from '../interfaces/verbs.interface';
import { VerbForm } from '../interfaces/verbsForm.interface';

const BASE_URL = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class VerbsService {

  constructor( 
    private http: HttpClient ) { }

  getVerbs():Observable<Verb[]> {
    return this.http.get<Verbs>(`${ BASE_URL }/verbs/user`)
      .pipe(
        map( resp => {
          return resp.verbs;
        }),
      );
  }

  addVerb( formData: VerbForm ):Observable<Verb> { 
    return this.http.post<Verb>(`${ BASE_URL }/verbs`, formData ); 
  }

  deleteVerb( id: string ) {
    return this.http.delete(`${ BASE_URL }/verbs/${ id }`);
  }
}
