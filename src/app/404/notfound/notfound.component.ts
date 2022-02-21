import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  template: `
    <div class="wrapper">
      <img src="assets/images/404.jpg" alt="not found" class="notfound">
      <button 
        (click)="backHome()"
        class="custombtn fs-4 link-btn">
        Back to Dashboard
      </button>
    </div>
  `,
  styleUrls: ['./notfound.component.scss'],
})
export class NotfoundComponent {

 
  constructor( private router: Router) {
    
  }

  backHome() {
    this.router.navigateByUrl('/dashboard/home');
  }
}
