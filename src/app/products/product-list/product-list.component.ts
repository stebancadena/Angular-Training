import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { cartItem } from "src/app/core/models/cartItem";
import { ApiService } from "src/app/core/services/api.service";
import { CartService } from "src/app/core/services/cart.service";
import { AddProductToCart } from "src/app/core/state/cart/cart.actions";
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
                private apiService: ApiService,
                private store: Store){}

    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
        this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true'

        this.apiSub = this.apiService.getProducts().subscribe(x => {
            this.products = x.data
            this.filteredProducts = this.products
        });
    }

    ngOnDestroy(): void {
        this.apiSub.unsubscribe();
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }

    addToCart(product): void {
        var item: cartItem = {
            product: product,
            qty: 1
        } 
        this.store.dispatch(new AddProductToCart(item))
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().includes(filterBy));
    }
}