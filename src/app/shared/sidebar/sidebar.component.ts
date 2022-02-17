import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template:`
<aside
  class="min-vh-100  boderdebug p-3 d-flex flex-column sidebar ">
    <a
      routerLink="/"
      class="fs-2 fw-bolder mt-4 mb-2 text-decoration-none text-white">
        English Journal
    </a>
    <hr class="text-white">

    <ul class="d-flex flex-column nav nav-pills">
        <li class="nav-item mb-2"
            *ngFor="let opt of menu">
         <a
            [routerLink]='opt.url'
            routerLinkActive="active"
            class="nav-link  text-white fs-4 fw-bold item-outline ">{{
            opt.title
            }}</a>
        </li>
    </ul>
</aside>
  `,
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent  {

  menu = [

    {
      title: 'Dashboard',
      url: 'home',
    },
    {
      title: 'Verbs',
      url: 'verbs',
    },
    {
      title: 'Phrasal Verbs',
      url: 'phrasalverbs',
    },
    {
      title: 'Adjectives',
      url: 'adjectives',
    },
    {
      title: 'Prepositions',
      url: 'prepositions',
    },
    {
      title: 'Connectors',
      url: 'connectors',
    },
  ];



  // constructor() { }


}
