import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { IProduct } from "../models/product";
import { IResponse } from "../models/responses";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURL = 'https://localhost:5001/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IResponse> {
    return this.http.get<IResponse>(this.apiURL)
      .pipe(
        tap(data => console.log('Products getted: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getProduct(id: string): Observable<any> {
    console.log('url is: ' +this.apiURL+'/'+id)
    return this.http.get(this.apiURL+'/'+id)
      .pipe(
        tap(res => {console.log(res)
                    console.log("Enter to the get single api service")}),
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