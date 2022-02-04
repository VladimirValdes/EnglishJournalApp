import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountRegister, DateFilter } from '../interfaces/countRegister.interface';

import { environment } from 'src/environments/environment';

const BASE_URL = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class StatisticsService {

  constructor( private http: HttpClient) { }

  getStatistic( dates: DateFilter ):Observable<CountRegister> {
    return this.http.get<CountRegister>(`${ BASE_URL }/searchuser/datescount/${ dates.startDate}/${ dates.endDate }`);
  }
}
