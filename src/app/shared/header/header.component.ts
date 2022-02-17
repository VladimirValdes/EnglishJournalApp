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
    <a class="ms-auto mx-4 d-sm-inline-block" href="#" data-bs-toggle="dropdown" aria-expanded="false"
        id="dropdownMenu" style="outline: none;">
      <img src="assets/images/avatar.png" class="avatar img-fluid rounded-circle me-1" alt="Chris Wood"> 
    </a>

    <ul class="dropdown-menu " aria-labelledby="dropdownMenu">
    <li><a class="dropdown-item  fs-4 cursor" >Profile</a></li>
    <li><a class="dropdown-item fs-4 cursor" >Settings</a></li>
    <li><hr class="dropdown-divider fs-4 "></li>
    <li>
      <a
        (click)="logout()"
        class="dropdown-item fs-4 cursor"
        >
        Sign out
      </a>
    </li>
  </ul>
            
            
    <!-- <button class=""
      (click)="logout()">
      <img src="assets/icons/logout.svg" alt="logout">
    </button> -->
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
