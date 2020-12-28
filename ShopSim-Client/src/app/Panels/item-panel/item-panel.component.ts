import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { Item } from '../../Models/Item'

@Component({
  selector: 'app-item-panel',
  templateUrl: './item-panel.component.html',
  styleUrls: ['./item-panel.component.css']
})
export class ItemPanelComponent implements OnInit {

  @Input() item: any;

  constructor(private CartService: CartService) { }

  ngOnInit(): void {
    this.item.quantity = 1;
  }

  addItemToCart() {
    this.CartService.addItem(this.item);
  }
  
}
