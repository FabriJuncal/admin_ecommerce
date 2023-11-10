import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategorieRoutingModule } from './categorie-routing.module';
import { CategorieComponent } from './categorie.component';
import { CategorieListComponent } from './categorie-list/categorie-list.component';
import { AddCategorieComponent } from './components/add-categorie/add-categorie.component';
import { EditCategorieComponent } from './components/edit-categorie/edit-categorie.component';
import { DeleteCategorieComponent } from './components/delete-categorie/delete-categorie.component';


@NgModule({
  declarations: [CategorieComponent, CategorieListComponent, AddCategorieComponent, EditCategorieComponent, DeleteCategorieComponent],
  imports: [
    CommonModule,
    CategorieRoutingModule
  ]
})
export class CategorieModule { }
