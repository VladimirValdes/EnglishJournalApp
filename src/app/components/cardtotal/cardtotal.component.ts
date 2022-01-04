import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cardtotal',
  template: `
  <div class="d-flex justify-content-center align-items-center card shadow" style="width: 18rem; boder-radius: 5px">
    <div class="card-body">
      <h5 class="card-title text-center fw-bolder" style="font-size: 5rem;" [style.color]="color">{{ number }}</h5>
      <p class="card-text text-center fs-2" [style.color]="color">{{ name }}</p>
    </div>
  </div>
  `,
  styleUrls: ['./cardtotal.component.scss']
})
export class CardtotalComponent implements OnInit {


  @Input() number = "";
  @Input() name = "";
  @Input() color = "";

  constructor() { }

  ngOnInit(): void {
  }

}
