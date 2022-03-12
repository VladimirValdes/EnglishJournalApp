import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/model/user.mode';
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
 
    <a class="ms-auto mx-4 d-sm-inline-block" href="#" data-bs-toggle="dropdown" aria-expanded="false"
        id="dropdownMenu" style="outline: none;">
      <img [src]=" user.img | image " class="avatar img-fluid rounded-circle me-1" alt="Chris Wood"> 
    </a>

    <ul class="dropdown-menu " aria-labelledby="dropdownMenu">
    <li><a routerLink="/dashboard/settings" class="dropdown-item  fs-4 cursor">My Account</a></li>
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
  </header>`,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  
  user: User;

  @Output() active = new EventEmitter<boolean>();

  menuActive = false;

  constructor( 
    private authService: AuthService) {

    this.user = this.authService.user;

  }




  logout() {
    this.authService.logout();
  }
 
  activeMenu() {
    this.menuActive = !this.menuActive;
    this.active.emit(this.menuActive);
  }



}
