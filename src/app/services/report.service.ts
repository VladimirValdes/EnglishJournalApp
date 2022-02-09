import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ReportService {

  constructor( private http: HttpClient) { }

  
  generateReport( collections: string, field: string, term = 'all') {
    return this.http.get(`${ BASE_URL }/reports/${ collections }/${ field }/${ term }`, { responseType: 'blob' })
      .pipe(
        map( resp => {

          return resp;
        
        }),
      );
  }
}
