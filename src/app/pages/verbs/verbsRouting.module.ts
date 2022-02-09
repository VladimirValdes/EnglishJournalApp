import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { VerbsComponent } from './verbs.component';


const routes: Routes = [
  { path: '', 
    component: VerbsComponent,
    data: { title: 'Verbs' }  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerbsRouting {}
