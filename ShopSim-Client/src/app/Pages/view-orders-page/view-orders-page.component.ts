import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/Order';
import { Store } from 'src/app/Models/Store';
import { LoginService } from 'src/app/Services/login.service';
import { OrderRetrievalService } from 'src/app/Services/order-retrieval.service';
import { StoreService } from 'src/app/Services/store.service';

@Component({
  selector: 'app-view-orders-page',
  templateUrl: './view-orders-page.component.html',
  styleUrls: ['./view-orders-page.component.css']
})
export class ViewOrdersPageComponent implements OnInit {


  orders : Order[] = [];
  stores? : Map<number,Store> = undefined;


  constructor(private orderService : OrderRetrievalService, private loginService : LoginService, private storeService : StoreService) { }

  ngOnInit(): void {
    if (this.loginService.user) {
    this.orderService.getOrders(this.loginService.user.id.toString(), this.handleOrders.bind(this));
    this.storeService.getStores(this.handleStores.bind(this), this.loginService.user?.zipcode);
    }
  }

  handleOrders(o : Order[]){
    if (o == undefined || o.length == 0) {
    } else {
      this.orders = o;
    }
  }

  handleStores(s : Store[]){

    let a : Map<number, Store> = new Map<number, Store>();
    s.forEach(store => {
      a.set(store.id, store)
    });
    this.stores = a;

  }


}
