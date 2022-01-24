import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          animate('.3s', style({ transform: 'translateX(0)' })),
        ]),
        transition(':leave', [
          animate('.3s', style({ transform: 'translateX(-100%)' })),
        ]),
      ],
    ),
  ],
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {

  menuActive = false;
 

}
