import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAccountPageComponent } from './Pages/create-account-page/create-account-page.component';
import { FinalizeOrderPageComponent } from './Pages/finalize-order-page/finalize-order-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { StoreDisplayPageComponent } from './Pages/store-display-page/store-display-page.component';
import { ZipCodePageComponent } from './Pages/zip-code-page/zip-code-page.component';
import { CartPageComponent } from "./Pages/cart-page/cart-page.component";
import { StoreSelectPageComponent } from './Pages/store-select-page/store-select-page.component'
import { ViewOrdersPageComponent } from './Pages/view-orders-page/view-orders-page.component';
import { ViewOrderPagesComponent} from './Pages/view-order-pages/view-order-pages.component';

const routes: Routes = [{
  path: '',
  component: ZipCodePageComponent,
},
{
  path: 'home',
  component: ZipCodePageComponent,
},
{
  path : 'login',
  component : LoginPageComponent
},
{
  path : 'createAccount',
  component : CreateAccountPageComponent
},
{
  path : 'createItemList',
  component : FinalizeOrderPageComponent
},
{
  path : 'store',
  component : StoreDisplayPageComponent
},
{
  path : 'cart',
  component : CartPageComponent
},
{
  path : 'selectStore',
  component : StoreSelectPageComponent
},
{
  path : 'orders',
  component : ViewOrdersPageComponent
}, {
  path : 'submitOrder',
  component : FinalizeOrderPageComponent
}, {
  path : 'viewOrder',
  component : ViewOrderPagesComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
