import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Verb, Verbs, SerchVerbs } from '../interfaces/verbs.interface';
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

  searchVerbs( term: string ):Observable<Verb[]> {
    return this.http.get<SerchVerbs>(`${ BASE_URL }/search/verbs/${ term }`)
      .pipe(
        map( resp => {
          return resp.results;
        }),
      );
  }

  addVerb( formData: VerbForm ):Observable<Verb> { 
    return this.http.post<Verb>(`${ BASE_URL }/verbs`, formData ); 
  }

  updateVerb( formData: VerbForm, id: string ) {
    return this.http.put<Verb>(`${ BASE_URL }/verbs/${ id }`, formData ); 
  }

  deleteVerb( id: string ) {
    return this.http.delete(`${ BASE_URL }/verbs/${ id }`);
  }
}
