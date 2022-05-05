import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  pageTitle = 'Product Edit'
  errorMessage?: string;

  editForm: FormGroup;

  product: IProduct;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getProduct(id);
    }
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: product => {if (product) {this.onProductRetrieved(product)}},
      error: err => this.errorMessage = err
    });
  }

  onProductRetrieved(product: IProduct): void {
    this.product = product;

    if (!this.product) {
      this.pageTitle = 'No product found';
    } else {
      if (this.product.productId === 0) {
        this.pageTitle = 'Add Product';
        this.editForm = new FormGroup({
          productName: new FormControl(''),
          productCode: new FormControl(''),
          price: new FormControl(''),
          description: new FormControl(''),
        })
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
        this.editForm = new FormGroup({
          productName: new FormControl(this.product.productName),
          productCode: new FormControl(this.product.productCode),
          price: new FormControl(this.product.price),
          description: new FormControl(this.product.description),
        })
      }
    }
  }

  deleteProduct(): void {
    if (this.product && this.product.productId){
      if (this.product.productId === 0) {
        this.onSaveComplete(`${this.product.productName} was deleted`);
      } else {
        if (confirm(`Really delete the product: ${this.product.productName}?`)) {
          this.productService.deleteProduct(this.product.productId).subscribe({
            next: () => this.onSaveComplete("Product deleted"),
            error: err => this.errorMessage = err
          });
        }
      }
    }
  }

  saveProduct(): void {
    if (this.product && this.product.productId) {
      if (this.product.productId === 0) {
        this.productService.createProduct(this.product).subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
      } else {
        this.productService.updateProduct(this.product).subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      alert(message);
    }
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.productName);
    console.log('Code', form.value.productCode);
    console.log('Price', form.value.price);
    console.log('Description', form.value.description);
  }

}
