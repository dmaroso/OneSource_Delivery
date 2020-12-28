import { Injectable } from '@angular/core';
import { Store } from 'src/app/Models/Store'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StoreService {


  private storeUrl = 'http://localhost:8080/ShopSim/shop/zip';
  private requestHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(private httpClient: HttpClient) { }


  public currentStore? : Store;


  getStores(callback: (s : Store[]) => any, zipcode? :  String, ) : void {

    
    
    let body  = `zipcode=${zipcode}`
    let resp : Observable<any> = this.httpClient.post<any>(this.storeUrl, body, {headers: this.requestHeaders, observe: 'response'});
    
    resp.subscribe(resp => {
      console.log(resp.body.body);

      //Make the store array
      let a : Store[] = [];
       resp.body.body.forEach((element : any) => {
        a.push({id : element.id,
          name : element.name,
          logoUrl : element.logoUrl,
          address : element.address,
          zipcode : element.zipcode} )
      });
      //Call the callback function with the 
      callback(a);
    }, error => {
      callback([]);
    });
    
    

  }

}
