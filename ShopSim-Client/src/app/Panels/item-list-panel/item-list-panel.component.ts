import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/Models/Item';
import { ItemListForm } from 'src/app/Models/ItemListForm';
import { Store } from 'src/app/Models/Store';
import { ViewOrderPagesComponent } from 'src/app/Pages/view-order-pages/view-order-pages.component';
import { ItemRetreivalKrogerService } from 'src/app/Services/item-retreival-Kroger.service';
import { ItemRetreivalWalmartService } from 'src/app/Services/item-retreival-walmart.service';

@Component({
  selector: 'app-item-list-panel',
  templateUrl: './item-list-panel.component.html',
  styleUrls: ['./item-list-panel.component.css']
})
export class ItemListPanelComponent implements OnInit {


  @Input() itemList : ItemListForm = { itemId : {productId: -1, orderId : -1}, quantity : -1};
  @Input() store? : Store;
  @Input() viewOrderPage? : ViewOrderPagesComponent;
  item? : Item = undefined;

  constructor(private krogerRetrieval : ItemRetreivalKrogerService, private walmartRetreival : ItemRetreivalWalmartService) { }

  ngOnInit(): void {
    if (this.itemList.quantity == -1) console.log("INITIALIZATION ERROR");
    if (this.store?.name == 'Walmart') {
      this.populateItem();
    } else {
      this.krogerRetrieval.initialize(this.populateItem.bind(this));
    }
  }

  pad(num:number, size:number): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }


  populateItem(){
    if (this.store?.name == 'Walmart') {
      this.walmartRetreival.requestItemById(this.itemList.itemId.productId.toString())
      .subscribe(resp => {
        this.item = resp;
        console.log(resp);
        this.viewOrderPage?.addAndRecalculateTotal(this);
      })
      
    } else {
    this.krogerRetrieval.requestItemById(this.pad(this.itemList.itemId.productId, 13))
      .subscribe(resp => {
        this.item = resp;
        console.log(resp);
        this.viewOrderPage?.addAndRecalculateTotal(this);
      })
    }
  }
  

}