import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountRegister } from '../interfaces/countRegister.interface';

const BASE_URL = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class DashboardService {

    

  constructor( 
    private http: HttpClient ) { }

  getCountRegisters():Observable<CountRegister> {
    return this.http.get<CountRegister>(`${ BASE_URL }/searchuser/count`);
  }


}
