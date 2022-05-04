import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = [];

  constructor() { }

  addToCart(product,qty): void {
    const item = [product,qty]
    this.cart.push(item)
  }

  getItems(): any[] {
    return this.cart
  }

  clearCart() {
    this.cart = [];
    return this.cart;
  }
}
