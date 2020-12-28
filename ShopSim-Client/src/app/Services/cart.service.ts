import { Injectable } from '@angular/core';
import { Item } from '../Models/Item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: Item[] = [];
  total: number = 0;

  constructor() { }

  addItem(newItem: Item) {

    let boolAdd = true;
    this.items.forEach(element => {
      if (newItem.id == element.id) {
        boolAdd = false;
        element.quantity += newItem.quantity;
      }
    });


   if (boolAdd) {
     this.items.push(JSON.parse(JSON.stringify(newItem)));
   }
   
   this.total = 0;
   this.items.forEach(element => {
     this.total += element.price * element.quantity;
   });

   newItem.quantity = 1;

  }

  clearCart(){
    this.items = [];
    this.total = 0;
  }
}
