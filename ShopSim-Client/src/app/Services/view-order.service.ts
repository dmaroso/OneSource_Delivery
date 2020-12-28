import { Injectable } from '@angular/core';
import { Order } from '../Models/Order';
import { Store } from '../Models/Store';

@Injectable({
  providedIn: 'root'
})
export class ViewOrderService {


  public order? : Order;
  public store? : Store;

  constructor() { }
}
