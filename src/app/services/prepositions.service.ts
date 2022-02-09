import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PrepositionForm } from '../interfaces/forms.interface';
import { Preposition, Prepositions, SearchPrepositions } from '../interfaces/preposition.interface';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class PrepositionsService {

  constructor( private http: HttpClient) { }

  getPrepositions():Observable<Preposition[]> {
    return this.http.get<Prepositions>(`${ BASE_URL }/prepositions/user`)
      .pipe(
        map( resp => {
          return resp.prepositions;
        }),
      );
  }

  updatePreposition( formData: PrepositionForm, id: string ) {
    return this.http.put<Preposition>(`${ BASE_URL }/prepositions/${ id }`, formData ); 
  }

  addPreposition( formData: PrepositionForm): Observable<Preposition> {
    return this.http.post<Preposition>(`${ BASE_URL }/prepositions`, formData );
  }

  deletePreposition( id: string ) {
    return this.http.delete(`${ BASE_URL }/prepositions/${ id }`);
  }

  searchPreposition( term: string ):Observable<Preposition[]> {
    return this.http.get<SearchPrepositions>(`${ BASE_URL }/searchuser/prepositions/${ term }`)
      .pipe(
        map( resp => {
          
          return resp.results;
        }),
      );
  }
}
