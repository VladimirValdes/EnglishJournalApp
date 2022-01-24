import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';



const routes: Routes = [
  { path: 'home', loadChildren: () => 
    import('./dashboard/dashboard.module').then( m => m.DashboardModule), 
  },
  { path: 'verbs', loadChildren: () => 
    import('./verbs/verbs.module').then( m => m.VerbsModule), 
  },
  {
    path: 'phrasalverbs', loadChildren: () =>
      import('./phrasal-verbs/phrasal-verbs.module').then( m => m.PhrasalVerbsModule ),
  },
  {
    path: 'adjectives', loadChildren: () => 
      import('./adjectives/adjectives.module').then( m => m.AdjectivesModule ),
  },
  {
    path: 'prepositions', loadChildren: () => 
      import('./prepositions/prepositions.module').then( m => m.PrepositionsModule ),
  },
  {
    path: 'connectors', loadChildren: () => 
      import('./connectors/connectors.module').then( m => m.ConnectorsModule ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildRouting {}
