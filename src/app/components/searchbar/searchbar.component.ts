import { Component } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  template: `
    <div class="searchbar my-4">
        <input type="search" class="searchbar__input fs-4" placeholder="Search ..." aria-describedby="addon-wrapping">
        <img src="/assets/icons/search.svg" alt="" class="searchbar__icon">
    </div>
  `,
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent  {

  // constructor() { }

  // ngOnInit(): void {
  // }

}
