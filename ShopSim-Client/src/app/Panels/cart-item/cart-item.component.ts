import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/Models/Item';
import { CartPageComponent } from 'src/app/Pages/cart-page/cart-page.component';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() item: any;
  @Input() cartPage?: CartPageComponent;

  show: boolean = true;

  constructor(private CartService: CartService) { }

  ngOnInit(): void {
  }

  removeItem() {
    let newCart = this.CartService.items.filter(cartItem => cartItem.id !== this.item.id);
    this.CartService.items = newCart;
    this.CartService.total = this.CartService.total - (this.item.price*this.item.quantity);
    this.show = false;
    this.cartPage?.updateTotal();
  }
}
