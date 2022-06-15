import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { IProduct } from "../models/product";
import { IResponse } from "../models/responses";
import { LoadProducts } from "../state/products/products.actions";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURL = 'https://localhost:5001/api/products';
  @Select(state => state.productsList) products$: Observable<IProduct[]>;

  constructor(private http: HttpClient,
              private store: Store) { }

  getProducts(): Observable<IResponse> {
    return this.http.get<IResponse>(this.apiURL)
      .pipe(
        tap(data => { this.store.dispatch(new LoadProducts(data.data))
      }),
        catchError(this.handleError)
      );
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(this.apiURL+'/'+id)
      .pipe(
        tap(res => {console.log(res.data)}),
      );
  }

  createProduct(product: IProduct): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    product.productId = undefined;
    return this.http.post<IProduct>(this.apiURL, product, { headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<IProduct>(url, { headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.handleError)
      );
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    const url = `${this.apiURL}/${product.productId}`;
    console.log(url)
    return this.http.put<IProduct>(url, product)
      .pipe(
        tap(() => console.log('updateProduct: ' + product.productId)),
        map(() => product),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}