import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/core/models/product';
import { ApiService } from 'src/app/core/services/api.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  @Select(state => state.productsList.productsList) products$: Observable<IProduct[]>;

  pageTitle = 'Product Edit'
  errorMessage?: string;

  editForm: FormGroup;

  product: IProduct;

  constructor(private productService: ProductService,
              private apiService: ApiService,
              private route: ActivatedRoute) { }

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
        if (product) {this.onProductRetrieved(product)}
      },
      error: err => this.errorMessage = err
    })
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
          productId: new FormControl(this.product.productId, [Validators.required]),
          productName: new FormControl(this.product.productName, [Validators.required]),
          productCode: new FormControl(this.product.productCode),
          price: new FormControl(this.product.price),
          description: new FormControl(this.product.description),
          imageUrl: new FormControl(this.product.imageUrl),
          releaseDate: new FormControl(this.product.releaseDate),
          starRating: new FormControl(this.product.starRating),
        })
      }

      this.editForm.patchValue({
        productName: this.product.productName,
        productCode: this.product.productCode,
        starRating: this.product.starRating,
        description: this.product.description
      });
    }
  }

  deleteProduct(): void {
    if (this.product && this.product.productId){
      if (this.product.productId === 0) {
        this.onSaveComplete(`${this.product.productName} was deleted`);
      } else {
        if (confirm(`Really delete the product: ${this.product.productName}?`)) {
          this.apiService.deleteProduct(this.product.productId).subscribe({
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
        this.apiService.updateProduct(this.product).subscribe({
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
    this.product = this.editForm.value;
    this.saveProduct()
  }

}
