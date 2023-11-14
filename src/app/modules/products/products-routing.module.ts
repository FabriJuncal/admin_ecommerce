import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from '../e-commerce/products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [{
  path: '',
  component: ProductsComponent,
  children: [
    {
      path: 'add-product',
      component: AddProductComponent
    },
    {
      path: 'list-products',
      component: ListProductsComponent
    },
    {
      path: 'edit-product/:id',
      component: EditProductComponent
    },
    {
      path: '', redirectTo: 'add-product', pathMatch: 'full'
    },
    {
      path: '**', redirectTo: 'add-product', pathMatch: 'full'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
