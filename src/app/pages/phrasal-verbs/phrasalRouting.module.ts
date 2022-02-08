import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PhrasalVerbsComponent } from './phrasal-verbs.component';



const routes: Routes = [
  { path: '',
    component: PhrasalVerbsComponent,
    data: { title: 'Phrasal Verbs' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhrasalVerbRouting {}
