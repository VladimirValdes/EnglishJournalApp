import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  template:`
    <header class="d-flex align-items-center  shadow bg-white mb-5">
    <button
      class="icon-menu"
      (click)="activeMenu()">
        <span class="icon-menu__bar">
        </span>
    </button>
    <div class="searchbar my-4">
        <input type="search" class="searchbar__input fs-4" placeholder="Search ..." aria-describedby="addon-wrapping">
        <img src="/assets/icons/search.svg" alt="" class="searchbar__icon">
    </div>
</header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  @Output() active = new EventEmitter<boolean>();
  menuActive = false;
  constructor() { }

  ngOnInit(): void {
  }

  activeMenu() {

     this.menuActive = !this.menuActive;
    this.active.emit(this.menuActive)
  }

}
