import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/Models/Item';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  items: Item[] = [];
  
  @Input() cartTotal: number = this.CartService.total;

  totalString : String = '';


  constructor(private CartService: CartService) {}

  ngOnInit(): void {
    this.items = this.CartService.items;
    this.updateTotal();
  }

  updateTotal(){
    this.totalString = Number(this.CartService.total).toFixed(2);
  }

}
