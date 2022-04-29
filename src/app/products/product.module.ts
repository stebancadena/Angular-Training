import { NgModule } from '@angular/core';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ConvertToSpacesPipe } from '../core/pipes/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from '../core/guards/product-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { ProductListComponent } from './product-list/product-list.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe,
  ],
  imports: [
    RouterModule.forChild([
      {path: 'products', component: ProductListComponent},
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard], 
        component: ProductDetailComponent
      },
    ]),
    SharedModule
  ],
  bootstrap: []
})
export class ProductModule { }
