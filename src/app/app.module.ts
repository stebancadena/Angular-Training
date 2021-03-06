import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './home/welcome.component';
import { ProductModule } from './products/product.module';
import { AppRoutingModule } from './app-routing.module';
import { CartComponent } from './cart/cart.component';
import { CartModule } from './cart/cart.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from './data.service';
import { HighlightDirective } from './core/directives/highlight.directive';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from 'src/environments/environment';
import { ProductsState } from './core/state/products/products.state';
import { CartState } from './core/state/cart/cart.state';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CartComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    //HttpClientInMemoryWebApiModule.forRoot(DataService),
    ProductModule,
    CartModule,
    AppRoutingModule,
    NgxsModule.forRoot([ProductsState, CartState],
      { developmentMode: !environment.production }
    ),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
