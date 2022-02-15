import { Injectable } from '@angular/core';
import { fromEvent, map, merge, Observable, of } from 'rxjs';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root',
})
export class CheckConnectionService {

 
  constructor( private alertService: AlertsService) {
    
  }

  checkConnection$():Observable<boolean> {
    return merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline'),
    ).pipe( map( () => navigator.onLine));
  }

  showAlertConnection( connection: boolean ){
    if ( connection ) {
      this.alertService.success('Connection', 'You are online again');
    } else {
      this.alertService.error('There is not internet connection');
    }
  }
}
