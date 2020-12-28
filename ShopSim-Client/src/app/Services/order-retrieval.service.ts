import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../Models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderRetrievalService {

  private ordersUrl = 'http://localhost:8080/ShopSim/shop/orders';
  private requestHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});


  constructor(private httpClient: HttpClient) { }

  public getOrders( userID : String, callback : (o : Order[]) => void) {

    let body  = `userID=${userID}`
    let resp : Observable<any> = this.httpClient.post<any>(this.ordersUrl, body, {headers: this.requestHeaders, observe: 'response'});
    
    resp.subscribe(resp => {
      console.log(resp);
      console.log(resp.body);
      console.log(resp.body.body);
      let a : Order[] = [];
       resp.body.body.forEach((element : any) => {
        a.push({
          id : element.id,
          userId : element.userID,
          storeId : element.storeId,
          orderDate : element.orderDate,
          deliveryDate : element.deliveryDate,
          payMethod : element.payMethod,
          items : element.items
        });
      });
      console.log(a);
      callback(a);
    }, error => {
      callback([]);
    });


  }

}
