import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PhrasalVerbForm } from '../interfaces/forms.interface';
import { PhrasalVerb, PhrasalVerbs, SearchPhrasalVerbs } from '../interfaces/phrasalVerb.interface';

const BASE_URL = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class PhrasalVerbService {

  constructor( private http: HttpClient) {
        
  }

  getPhrasalVerbs( from = 0):Observable<PhrasalVerbs> {
    return this.http.get<PhrasalVerbs>(`${ BASE_URL }/phrasalverbs/user?from=${ from }`);
  }

  updatePhrasalVerb( formData: PhrasalVerbForm, id: string ) {
    return this.http.put<PhrasalVerb>(`${ BASE_URL }/phrasalverbs/${ id }`, formData ); 
  }

  addPhrasalVerb( formData: PhrasalVerbForm): Observable<PhrasalVerb> {
    return this.http.post<PhrasalVerb>(`${ BASE_URL }/phrasalverbs`, formData );
  }

  deletePhrasalVerb( id: string ) {
    return this.http.delete(`${ BASE_URL }/phrasalverbs/${ id }`);
  }

  searchPhrasalVerbs( term: string, from = 0 ):Observable<PhrasalVerbs> {
    return this.http.get<SearchPhrasalVerbs>(`${ BASE_URL }/searchuser/phrasalverbs/${ term }?from=${ from }`)
      .pipe(
        map( resp => {
          
          return { total: resp.total, phrasalVerbs: resp.results };
        }),
      );
  }
}