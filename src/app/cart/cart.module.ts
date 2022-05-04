import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart.component';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path: 'cart', component: CartComponent},
    ]),
  ]
})
export class CartModule { }
