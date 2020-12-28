import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, onErrorResumeNext } from 'rxjs';
import { Item } from '../Models/Item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private submitUrl = 'http://localhost:8080/ShopSim/shop/submit';
  private requestHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private httpClient: HttpClient) { }

  submitOrder(targetDate: string, cardNum: string, items: Item[]): Observable<any>{
    let unixTs = +new Date;
    let dateObj = new Date(unixTs);
    let orderdItems: { productId: string; quantity: number; }[] = [];

  

    items.forEach(item => {
      orderdItems.push({
        "productId": item.id,
        "quantity": item.quantity
      })
      console.log(item);
    })
    
    let body = {
      "userId": localStorage.getItem('userId'),
      "storeId": sessionStorage.getItem('storeId'),
      "orderDate": dateObj.getFullYear() + '-' + ("0" + (dateObj.getMonth() + 1)).slice(-2) + '-' + ("0" + dateObj.getDate()).slice(-2),
      "deliveryDate": targetDate,
      "payMethod": cardNum,
      "items": orderdItems
    }

    return this.httpClient.post<any>(this.submitUrl, body, {headers: this.requestHeaders, observe: 'body'})
  }
}
