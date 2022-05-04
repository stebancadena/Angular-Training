import { Component, OnInit } from '@angular/core';
import { IProduct } from "../core/models/product";
import { CartService } from '../core/services/cart.service';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'pm-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  pageTitle:string = 'Cart';

  products: IProduct[] = [];
  
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;

  errorMessage = '';

  constructor(private cartService: CartService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.cartService.getItems().map( item => {
        this.getProduct(item[0])
      }
    )
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: product => this.products.push(product),
      error: err => this.errorMessage = err
    });
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

}
