import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Select } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { CartService } from "src/app/core/services/cart.service";
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
    apiSub!: Subscription;

    @Select(state => state.productsList) products$: Observable<IProduct[]>;
    
    private _listFilter: string = '';
    get listFilter(): string {
       return this._listFilter; 
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.performFilter(value);
    }

    constructor(private productService: ProductService,
                private route: ActivatedRoute,
                private cartService: CartService,
                private apiService: ApiService){}

    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
        this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';

        // this.sub = this.productService.getProducts().subscribe({
        //     next: products => {
        //       this.products = products;
        //       this.filteredProducts = this.products;
        //     },
        //     error: err => this.errorMessage = err
        //   });

        this.apiSub = this.apiService.getProducts().subscribe(x => {
            console.log("Entro aca")
            console.log(JSON.stringify(x.data))
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
        this.apiSub.unsubscribe();
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }

    addToCart(product): void {
        this.cartService.addToCart(product,1);
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().includes(filterBy));
    }
}