import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../Models/Item';
import { AuthorizationService } from './authorization.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemRetreivalKrogerService {

  private token: string ='';
  private requestHeaders = new HttpHeaders();
  initYet = false;

  constructor(private httpClient: HttpClient, private AuthorizationService: AuthorizationService) {
    this.initialize(()=>{});
  }

  initialize(callback : () => void) {
  if (!this.initYet) {
    console.log("WTF");
    this.AuthorizationService.getToken().subscribe(resp => {
      this.token = resp.access_token;
      this.requestHeaders = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Access-Control-Allow-Origin': '*'
      });
      this.initYet = true;
      callback();
    })
  } else {
    callback();
  }
  }

  requestItemByTerm(term: string, limit: number, brand?: string): Observable<Item[]> {
    let terms = term.split(" ");
    let urlParams = `/products?filter.locationId=01400465&filter.term=${terms[0]}`;
    for (let i = 1; i <terms.length; i++) {
      urlParams = urlParams + `%20${terms[i]}`;
    }
    if (limit) {
      urlParams = urlParams + `&filter.limit=${limit}`;
    }
    if (brand) {
      urlParams = urlParams + `&filter.brand=${brand}`;
    }
    return this.httpClient.get(this.AuthorizationService.apiUrl + urlParams, {headers: this.requestHeaders, observe: 'body'})
      .pipe(map((resp:any) => {
        return resp.data.map((item:any) => {
          let newItem: Item = {
            id: item.productId,
            description: item.description,
            price: item.items[0].price.regular,
            url: '',
            quantity: 0
          };
          let images: any[] = item.images;
          images.forEach(element => {
            if (element.perspective == 'front') {
              element.sizes.forEach((url: any) => {
                if (url.size == 'large') {
                  newItem.url = url.url;
                }
              })
            }
          })
        return newItem;
      })
    }))
  }

  requestItemById(productId: string): Observable<Item> {
    let urlParams = `/products?filter.locationId=01400465&filter.productId=${productId}`;
    return this.httpClient.get<any>(this.AuthorizationService.apiUrl + urlParams, {headers: this.requestHeaders, observe: 'body'})
    .pipe(map((resp:any) => {
      console.log(resp);
      console.log(resp.data);
      let newItem: Item = {
        id: resp.data[0].productId,
        description: resp.data[0].description,
        price: resp.data[0].items[0].price.regular,
        url: '',
        quantity: 1
      };
      let images: any[] = resp.data[0].images;
      images.forEach(element => {
        if (element.perspective == 'front') {
          element.sizes.forEach((url: any) => {
            if (url.size == 'large') {
              newItem.url = url.url;
            }
          })
        }
      })
      return newItem;
    }))
  }


  




}
