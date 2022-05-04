import { Component, OnInit } from '@angular/core';
import { IProduct } from "../core/models/product";

@Component({
  selector: 'pm-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  pageTitle:string = 'Cart';

  products: IProduct[];

  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;

  errorMessage = '';

  constructor() { }

  ngOnInit(): void {
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

}
