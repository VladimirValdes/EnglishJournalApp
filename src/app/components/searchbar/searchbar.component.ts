import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-searchbar',
  template: `
  <form
    [formGroup]="searchForm"
    (ngSubmit)="search()">
    <div class="searchbar my-4">
        <input type="search"  formControlName="search" class="searchbar__input fs-4" placeholder="Search ..." aria-describedby="addon-wrapping">
        <img src="/assets/icons/search.svg" alt="" class="searchbar__icon">
    </div>
  </form>
  `,
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {

  searchForm!: FormGroup;

  @Output()submitted:EventEmitter<string> = new EventEmitter<string>();
 
  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: [],
    });

    this.search();
  }

  
  search() {
    this.searchForm.controls['search'].valueChanges
      .pipe(
        map(( search: string ) => (search !== null) ? search.trim() : search),
        debounceTime(350),
        distinctUntilChanged(),
        // filter( ( search: string ) =>  search !== '' ),
        tap( res => {
          if ( res !== null) { 
            this.submitted.emit(res); 
          } else {
            this.submitted.emit('');
          }
        })).subscribe();      
  }

}
