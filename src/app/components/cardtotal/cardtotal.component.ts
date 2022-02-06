import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardtotal',
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0, transform: 'translateY(-10px)' })),
      ]),
    ]),
  ],
  template: `
  <div class="cardT d-flex justify-content-center align-items-center card shadow mt-2" style="width: 16rem; boder-radius: 5px"
    (click)="navigateTo()">
    <div class="card-body">
     <h5
        [@fadeSlideInOut]
        class="card-title text-center fw-bolder"
        style="font-size: 5rem;"
        [style.color]="color">{{ number }}</h5>
      <p class="card-text text-center fs-2" [style.color]="color">{{ name }}</p>
    </div>
  </div>
  `,
  styleUrls: ['./cardtotal.component.scss'],
})
export class CardtotalComponent  {

  @Input() number = 0;

  @Input() name = '';

  @Input() color = '';

  @Input() routeName = '';
  
  constructor( private route: Router) {
    
  }




  navigateTo() {
    console.log('Im navigation to ');

    this.route.navigateByUrl(`/dashboard/${ this.routeName }`);
    
  }


}
