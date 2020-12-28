import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/Models/Item';
import { CartService } from 'src/app/Services/cart.service';
import { OrderService } from 'src/app/Services/order.service';


@Component({
  selector: 'app-finalize-order-page',
  templateUrl: './finalize-order-page.component.html',
  styleUrls: ['./finalize-order-page.component.css']
})
export class FinalizeOrderPageComponent implements OnInit {
  
  items: Item[] = this.CartService.items;
  cardNumber: string = '';
  targetDate: string = '';
  message: string = '';
  constructor(private CartService: CartService, private OrderService: OrderService) { }

  ngOnInit(): void {
  }

  onOrderClick() {
    this.OrderService.submitOrder(this.targetDate, this.cardNumber, this.items)
      .subscribe(resp => {
        this.message = resp.message;
        this.CartService.clearCart();   
      })
  }

  formatCard() {
    var index = this.cardNumber.lastIndexOf('-');
    var test = this.cardNumber.substr(index + 1);
    if (test.length === 4)
         this.cardNumber = this.cardNumber + '-';
  }
}
