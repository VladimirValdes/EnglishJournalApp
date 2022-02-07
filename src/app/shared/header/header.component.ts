import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  template:`
  <header class="d-flex align-items-center  shadow bg-white mb-5 header" style="z-index: 100;">
    <button
      class="icon-menu"
      type="button"
      
      (click)="activeMenu()">
        <span class="icon-menu__bar">
        </span>
    </button>
 
    <app-searchbar [borderR]="'25px'"></app-searchbar>
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
