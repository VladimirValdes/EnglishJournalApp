import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [

  {
    path: '',
    component: NotfoundComponent,
    data: { title: 'page not found' },
  },

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotFoundRouting {}
