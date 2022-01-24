import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  template:`
  <header class="d-flex align-items-center  shadow bg-white mb-5 header">
    <button
      class="icon-menu"
      type="button"
      
      (click)="activeMenu()">
        <span class="icon-menu__bar">
        </span>
    </button>
    <div class="searchbar my-4">
        <input type="search" class="searchbar__input fs-4" placeholder="Search ..." aria-describedby="addon-wrapping">
        <img src="/assets/icons/search.svg" alt="" class="searchbar__icon">
    </div>
    <button class="ms-auto mx-4"
      (click)="logout()">
      <img src="assets/icons/logout.svg" alt="logout">
    </button>
  </header>`,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  
  constructor( 
    private authService: AuthService ) {}

  @Output() active = new EventEmitter<boolean>();

  menuActive = false;



  logout() {

    this.authService.logout();

  }
 
  activeMenu() {
    this.menuActive = !this.menuActive;
    this.active.emit(this.menuActive);
  }

}
