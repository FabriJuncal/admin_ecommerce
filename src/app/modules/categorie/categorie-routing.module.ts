import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategorieComponent } from './categorie.component';
import { CategorieListComponent } from './categorie-list/categorie-list.component';

const routes: Routes = [
  {
    path: '',
    component: CategorieComponent,
    children: [
      {
        path: 'list',
        component: CategorieListComponent
      },
      {
        path: '', redirectTo: 'list', pathMatch: 'full'
      },
      {
        path: '**', redirectTo: 'list', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategorieRoutingModule { }
