import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Connector, Connectors, SearchConnectors } from '../interfaces/connectors.interface';
import { ConnectorForm } from '../interfaces/forms.interface';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ConnectorsService {

  constructor( private http: HttpClient) { }

  
  getConnectors():Observable<Connector[]> {
    return this.http.get<Connectors>(`${ BASE_URL }/connectors/user`)
      .pipe(
        map( resp => {
          return resp.connectors;
        }),
      );
  }

  updateConnector( formData: ConnectorForm, id: string ) {
    return this.http.put<Connector>(`${ BASE_URL }/connectors/${ id }`, formData ); 
  }

  addConnector( formData: ConnectorForm): Observable<Connector> {
    return this.http.post<Connector>(`${ BASE_URL }/connectors`, formData );
  }

  deleteConnector( id: string ) {
    return this.http.delete(`${ BASE_URL }/connectors/${ id }`);
  }

  searchConnectors( term: string ):Observable<Connector[]> {
    return this.http.get<SearchConnectors>(`${ BASE_URL }/searchuser/connectors/${ term }`)
      .pipe(
        map( resp => {
          
          return resp.results;
        }),
      );
  }
}
