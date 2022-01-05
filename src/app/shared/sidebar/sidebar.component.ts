import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template:`
  <aside class="h-100  boderdebug p-3 d-flex flex-column" style="width: 250px; background-color: #0f172a;">
    <a href="#" class="fs-2 fw-bolder mt-4 mb-2 text-decoration-none text-white">
        English Journal
    </a>
    <hr class="text-white">

    <ul class="d-flex flex-column nav nav-pills">
        <li class="nav-item mb-2"
            *ngFor="let opt of opts">
          <a class="nav-link  text-white fs-4 fw-bold" href="#">{{ opt }}</a>
        </li>
    </ul>
</aside>
  ` ,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  opts = [
    'Dashboard',
    'Verbs',
    'Phrasal Verbs',
    'Adjectives',
    'Prepositions',
    'Connectors'
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
