import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Structural/nav-bar/nav-bar.component';
import { FooterComponent } from './Structural/footer/footer.component';
import { ZipCodePageComponent } from './Pages/zip-code-page/zip-code-page.component';
import { StoreSelectPageComponent } from './Pages/store-select-page/store-select-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { CreateAccountPageComponent } from './Pages/create-account-page/create-account-page.component';
import { StoreDisplayPageComponent } from './Pages/store-display-page/store-display-page.component';

import { FiltersComponent } from './Pages/store-display-page/filters/filters.component';
import { ProductListComponent } from './Pages/store-display-page/product-list/product-list.component';
import { StoreInfoComponent } from './Pages/store-display-page/store-info/store-info.component';



import { CartPageComponent } from './Pages/cart-page/cart-page.component';
import { FinalizeOrderPageComponent } from './Pages/finalize-order-page/finalize-order-page.component';
import { ItemPanelComponent } from './Panels/item-panel/item-panel.component';
import { StorePanelComponent } from './Panels/store-panel/store-panel.component';
import { ItemRetreivalKrogerService } from './Services/item-retreival-Kroger.service';
import { LoginService } from './Services/login.service'
import { CartService } from './Services/cart.service';
import { StoreService } from './Services/store.service';
import { OrderPanelComponent } from './Panels/order-panel/order-panel.component';
import { ViewOrdersPageComponent } from './Pages/view-orders-page/view-orders-page.component';
import { AuthorizationService } from './Services/authorization.service';
import { CartItemComponent } from './Panels/cart-item/cart-item.component';
import { HeaderComponent } from './Structural/header/header.component';
import { OrderService } from './Services/order.service';
import { ItemRetreivalWalmartService } from './Services/item-retreival-walmart.service';
import { ViewOrderPagesComponent } from './Pages/view-order-pages/view-order-pages.component';
import { ItemListPanelComponent } from './Panels/item-list-panel/item-list-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    ZipCodePageComponent,
    StoreSelectPageComponent,
    LoginPageComponent,
    CreateAccountPageComponent,
    StoreDisplayPageComponent,
    FiltersComponent,
    ProductListComponent,
    StoreInfoComponent,


    CartPageComponent,
    FinalizeOrderPageComponent,
    ItemPanelComponent,
    StorePanelComponent,
    OrderPanelComponent,
    ViewOrdersPageComponent,
    CartItemComponent,
    HeaderComponent,
    ViewOrderPagesComponent,
    ItemListPanelComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [LoginService, CartService, StoreService, ItemRetreivalKrogerService, AuthorizationService, OrderService, ItemRetreivalWalmartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
