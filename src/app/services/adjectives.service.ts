import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Adjective, Adjectives, SearchAdjectives } from '../interfaces/adjectives.interface';
import { AdjectiveForm } from '../interfaces/forms.interface';


const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AdjectivesService {

  constructor( private http: HttpClient) { }

  
  getAdjectives( from = 0):Observable<Adjectives> {
    return this.http.get<Adjectives>(`${ BASE_URL }/adjectives/user?from=${ from }`);
  }

  updateAdjective( formData: AdjectiveForm, id: string ) {
    return this.http.put<Adjective>(`${ BASE_URL }/adjectives/${ id }`, formData ); 
  }

  addAdjective( formData: AdjectiveForm): Observable<Adjective> {
    return this.http.post<Adjective>(`${ BASE_URL }/adjectives`, formData );
  }

  deleteAdjective( id: string ) {
    return this.http.delete(`${ BASE_URL }/adjectives/${ id }`);
  }

  searchAdjectives( term: string, from = 0 ):Observable<Adjectives> {
    return this.http.get<SearchAdjectives>(`${ BASE_URL }/searchuser/adjectives/${ term }?from=${ from }`)
      .pipe(
        map( resp => {
          
          return { total: resp.total, adjectives: resp.results };
        }),
      );
  }
}
