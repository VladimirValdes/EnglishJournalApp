import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {

  disableNext = false;

  disablePrev = false;

  from = 0;

  indexPage = 0;

  pages: number[] = [];

  totalSubject: Subject<number> = new Subject();

  pagination( total: number ) { 

    const numberPages = Math.ceil( total / 5);
    
    this.pages = [];
    this.indexPage = 0;
    
    if ( total > 5) {
      
      this.pages = Array(numberPages).fill({}).map((x, i) => ( i + 1));
      
      this.disableNext = false;
      this.disablePrev = false;
      
    } else {
      
      this.pages.push(1);
      this.indexPage = 0;
      this.disableNext = true;
      this.disablePrev = true;

    }
  }

  getPaginationNumber( index = 0) {
    this.indexPage = index;


    this.from = this.indexPage * 5;
    this.totalSubject.next(this.from);


    this.disableNext = false;
    this.disablePrev = false;

  }

  previus() {

    if ( this.indexPage > 0) {

      this.indexPage = this.indexPage - 1;

      this.from = this.from  - 5;
      this.totalSubject.next(this.from);
      if ( this.disableNext ) {  this.disableNext = false; }

    } else {
      this.disablePrev = true;
    }
  }

  next() {

    if (this.indexPage < ( this.pages.length - 1 ) ) {
      
      this.indexPage = this.indexPage  + 1;

      this.from = this.indexPage  * 5;
      this.totalSubject.next(this.from);

      if ( this.disablePrev ) {  this.disablePrev = false; }

    } else {
      this.disableNext = true;
    }
  }


}
