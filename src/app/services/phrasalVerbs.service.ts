import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PhrasalVerbForm } from '../interfaces/forms.interface';
import { PhrasalVerb, PhrasalVerbs } from '../interfaces/phrasalVerb.interface';

const BASE_URL = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class PhrasalVerbService {

  constructor( private http: HttpClient) {
        
  }

  getPhrasalVerbs():Observable<PhrasalVerb[]> {
    return this.http.get<PhrasalVerbs>(`${ BASE_URL }/phrasalverbs/user`)
      .pipe(
        map( resp => {
          return resp.phrasalVerbs;
        }),
      );
  }

  addPhrasalVerb( formData: PhrasalVerbForm): Observable<PhrasalVerb> {
    return this.http.post<PhrasalVerb>(`${ BASE_URL }/phrasalverbs`, formData );

  }
}