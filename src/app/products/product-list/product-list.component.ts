import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { IProduct } from "../../core/models/product";
import { ProductService } from "../../core/services/product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy{
    pageTitle:string = 'Product List';

    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;

    errorMessage = '';
    sub!: Subscription;
    
    private _listFilter: string = '';
    get listFilter(): string {
       return this._listFilter; 
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.performFilter(value);
    }

    constructor(private productService: ProductService,
                private route: ActivatedRoute){}

    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
        this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';

        this.sub = this.productService.getProducts().subscribe({
            next: products => {
              this.products = products;
              this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
          });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().includes(filterBy));
    }
}