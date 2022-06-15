import { Component, OnInit } from '@angular/core';
import { IProduct } from "../core/models/product";
import { ApiService } from '../core/services/api.service';
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
  quantities: number[] = [];
  
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;

  errorMessage = '';

  constructor(private cartService: CartService,
              private productService: ProductService,
              private apiService: ApiService) { }

  ngOnInit(): void {
    this.cartService.getItems().map( item => {
        this.getProduct(item[0])
        this.quantities.push(item[1])
      }
    )
  }

  getProduct(id: string): void {
    this.apiService.getProduct(id).subscribe({
      next: product => this.products.push(product.data),
      error: err => this.errorMessage = err
    });
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onAdd(index: number): void {
    this.quantities[index] += 1;
  }

  onSubstract(index: number): void {
    let onMinus = this.quantities[index] - 1;
    if(onMinus === 0){
      this.onDelete(index)      
    }else {
      this.quantities[index] -= 1;
    }
  }

  onDelete(index: number): void {
    this.products.splice(index)
    this.quantities.splice(index)
  }

}
