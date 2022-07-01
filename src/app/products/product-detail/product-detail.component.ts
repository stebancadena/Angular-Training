import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { cartItem } from 'src/app/core/models/cartItem';
import { CartService } from 'src/app/core/services/cart.service';
import { AddProductToCart } from 'src/app/core/state/cart/cart.actions';
import { IProduct } from '../../core/models/product';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Select(state => state.productsList.productsList) products$: Observable<IProduct[]>;

  pageTitle: string = "Product Detail";
  errorMessage = '';
  product: IProduct | undefined;

  constructor(private route: ActivatedRoute,
              private store: Store,
              private router: Router,
              private productService: ProductService,
              private cartService: CartService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getProduct(id);
    }
  }

  getProduct(id: any): void {
    this.products$.subscribe({
      next: products => {
        var product = products.find(x => x.productId === id)
        if (product) {this.product = product}
      },
      error: err => this.errorMessage = err
    })
  }

  addToCart(product): void {
    var item: cartItem = {
      product: product,
      qty: 1
  } 
  this.store.dispatch(new AddProductToCart(item))
  }
}
