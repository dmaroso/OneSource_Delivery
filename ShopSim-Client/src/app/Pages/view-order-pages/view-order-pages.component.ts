import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/Models/Item';
import { Order } from 'src/app/Models/Order';
import { Store } from 'src/app/Models/Store';
import { ItemListPanelComponent } from 'src/app/Panels/item-list-panel/item-list-panel.component';
import { OrderService } from 'src/app/Services/order.service';
import { ViewOrderService } from 'src/app/Services/view-order.service';

@Component({
  selector: 'app-view-order-pages',
  templateUrl: './view-order-pages.component.html',
  styleUrls: ['./view-order-pages.component.css']
})
export class ViewOrderPagesComponent implements OnInit {

  constructor(private viewOrderService : ViewOrderService) { }


  store? : Store;
  order? : Order;

  items : ItemListPanelComponent[] = [];

  total : string = '0.00';


  addAndRecalculateTotal(i: ItemListPanelComponent ) {
    this.items.push(i);
    let total = 0;
    this.items.forEach(element => {
      if(element.item)
      total += element.item?.price * element.itemList.quantity;
    });
    this.total = Number(total).toFixed(2); 
  }

  ngOnInit(): void {
    this.store = this.viewOrderService.store;
    this.order = this.viewOrderService.order;
    console.log("ORDER: " + JSON.stringify(this.viewOrderService.order));
    if (this.order) {
    this.order.payMethod = this.cc_format(this.order?.payMethod)
    }
  }

  cc_format(value : string) : string {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []

    for (let i=0, len=match.length; i<len; i+=4) {
        parts.push(match.substring(i, i+4))
    }

    if (parts.length) {
        return parts.join('-')
    } else {
        return value
    }
}



  
}
