// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { AuthorizationService } from './authorization.service';

// @Injectable({
//   providedIn: 'root'
// })
//export class ItemRetreivalService {

//   public token: string ='';
//   public requestHeaders = new HttpHeaders();
//   public initYet : Boolean = false
//   constructor(private httpClient: HttpClient, private AuthorizationService: AuthorizationService) {
  
//   }


//   initialize(callback: () => void) : void {
//     if(!this.initYet) {
//     this.AuthorizationService.getToken().subscribe(resp => {
//       this.token = resp.access_token;
//       this.requestHeaders = new HttpHeaders({
//         'Authorization': `Bearer ${this.token}`,
//         'Access-Control-Allow-Origin': '*'
//       });
//       console.log("TOKEN: " + this.token + " Headers " );
//       callback();
//     });
//   } else {
//     callback();
//   }
//   }


//   requestItemByTerm(term: string, limit?: number, brand?: string): Observable<any>{
//     let terms = term.split(" ");
//     let urlParams = `/products?filter.locationId=01400465&filter.term=${terms[0]}`;
//     for (let i = 1; i <terms.length; i++) {
//       urlParams = urlParams + `%20${terms[i]}`;
//     }
//     if (limit) {
//       urlParams = urlParams + `&filter.limit=${limit}`;
//     }
//     if (brand) {
//       urlParams = urlParams + `&filter.brand=${brand}`;
//     }
//     return this.httpClient.get<any>(this.AuthorizationService.apiUrl + urlParams, {headers: this.requestHeaders, observe: 'body'});
//   }

//   requestItemById(productId: number): Observable<any> {
//     //let urlParams = `/products?filter.productId=${productId}`;
    
//     let urlParams = `/products?filter.locationId=01400465&filter.productId=${this.pad(productId, 13)}`;;
//     return this.httpClient.get<any>(this.AuthorizationService.apiUrl + urlParams, {headers: this.requestHeaders, observe: 'body'});
//   }
//   pad(num:number, size:number): string {
//     let s = num+"";
//     while (s.length < size) s = "0" + s;
//     return s;
// }

//}
