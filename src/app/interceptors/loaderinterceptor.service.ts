import { HttpErrorResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingServicesService } from '../services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderinterceptorService {
  private requests: HttpRequest<any>[] = [];

  constructor( private loadingService: LoadingServicesService) { }

  removeRequest( req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);

    if ( i >= 0) {
      this.requests.splice(i, 1);
    }

    this.loadingService.loadingSub.next( this.requests.length > 0 );

  }

  intercept( req: HttpRequest<any>, next: HttpHandler ) {
    let updateRequest: HttpRequest<any>;

    updateRequest = req.clone();
    this.loadingService.loadingSub.next( true );


    this.requests.push( updateRequest );

    return next.handle( updateRequest ).pipe(
      catchError( ( error: HttpErrorResponse ) => this.handleError( error, updateRequest) ),
      finalize(() => this.removeRequest( updateRequest) )
    );
  }

  handleError( error: HttpErrorResponse, req: HttpRequest<any> ) {
    console.warn( error );
    this.removeRequest(req);
    return throwError( () => new Error('Something went wrong on Loader Interceptor '));
  }
}
