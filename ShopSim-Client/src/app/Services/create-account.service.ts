import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {

  private hasAccount = false; //check if the user has an account first
  private createAccountUrl = 'http://localhost:8080/ShopSim/shop/create';
  private requestHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(private httpClient: HttpClient) { }

  //NOTE: these params need to have matching names to the newUserModel (which i assume is our user model/table)
  sendCreate(firstName: string, lastName: string, email: string, password: string,  address: string, zipcode: string, callback : (b: boolean) => void): void {
      let body = `firstName=${firstName}&lastName=${lastName}&email=${email}&password=${password}&address=${address}&zipcode=${zipcode}`;
      this.httpClient.post<any>(this.createAccountUrl, body, {headers: this.requestHeaders, observe: 'response'})
      .subscribe(resp => { //subscribe since it's an oberservalbe 
        callback(true);
      }, 
      error => {
        callback(false);
      })
     }
}
