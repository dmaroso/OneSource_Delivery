import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/Models/Order';
import { Store } from 'src/app/Models/Store';
import { ViewOrderService } from 'src/app/Services/view-order.service';

@Component({
  selector: 'app-order-panel',
  templateUrl: './order-panel.component.html',
  styleUrls: ['./order-panel.component.css']
})
export class OrderPanelComponent implements OnInit {



  @Input()  public order? : Order;
  @Input()  public store? : Store; 

  constructor(private router : Router, private viewOrderService : ViewOrderService) { }

  ngOnInit(): void {
  }

  viewOrder(){
    this.viewOrderService.store = this.store;
    this.viewOrderService.order = this.order;
    this.router.navigate(['/viewOrder']);
  }


  

}
