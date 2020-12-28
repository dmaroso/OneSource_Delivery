import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, zip, pipe, from } from 'rxjs';
import { concatMap, flatMap, map, mergeAll, mergeMap, switchMap, take, tap, toArray } from 'rxjs/operators/';
import { environment } from 'src/environments/environment.prod';
import { Item } from '../Models/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemRetreivalWalmartService {

  private key = environment.walmart.apiKey;
  private apiKeywordUrl = environment.walmart.apiKeywordUrl;
  private apiProductUrl = environment.walmart.apiProductUrl;
  private host = environment.walmart.host;

  private keywordHeaders = new HttpHeaders({
    'x-rapidapi-key': this.key,
    'x-rapidapi-host': this.host,
    'useQueryString': 'true'
  });

  private productHeaders = new HttpHeaders({
    'x-rapidapi-key': this.key,
    'x-rapidapi-host': this.host
  })

  constructor(private httpClient: HttpClient) { }

  requestItemById(productUrl: string): Observable<Item> {
    let urlParams =`url=https://www.walmart.com/${productUrl}`;
    return this.httpClient.get(this.apiProductUrl+urlParams, {headers: this.productHeaders, observe: 'body'})
      .pipe(map((resp:any) => {
        let newItem: Item = {
          id: productUrl,
          description: resp.productTitle,
          price: resp.price,
          url: resp.imageUrlList[0],
          quantity: 1
        };
        return newItem;
      }))
  }

  requestItemByTerm(term: string, limit: number): Observable<Item[]> {
    let terms = term.split(" ");
    let urlParams = `page=1&type=text&sortBy=best_seller&keyword=${terms[0]}`;
    for (let i = 1; i <terms.length; i++) {
      urlParams = urlParams + `%20${terms[i]}`;
    }
    let items: Item[] = [];
    return this.httpClient.get<any>(this.apiKeywordUrl+urlParams, {headers: this.keywordHeaders, observe: 'body'})
      .pipe(
          tap((resp:any) => console.log('before map', resp.foundProducts)),
          switchMap((resp:any) => from(resp.foundProducts)),
          take(limit)
      )
      .pipe(
          take(limit),
          tap((obj:any) => console.log("Second Pipe", obj)),
          concatMap((url:any) => this.requestItemById(url)),
          toArray()
        );       
    }
}