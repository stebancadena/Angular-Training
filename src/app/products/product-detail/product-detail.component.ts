import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
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
    this.cartService.addToCart(product,1);
  }
}
