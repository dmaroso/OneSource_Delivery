import { HttpClient, HttpHeaders } from '@angular/common/http';
import { importType } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/User';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public user? : User;
  private loginUrl = 'http://localhost:8080/ShopSim/shop/login';
  private requestHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  

  constructor(private httpClient: HttpClient, private router : Router) { }

  sendLogin(email: string, password: string, callback: (b : boolean) => any){
    let body = `email=${email}&password=${password}`;
    let result = false;
    this.httpClient.post<any>(this.loginUrl, body, {headers: this.requestHeaders, observe: 'response'}).subscribe(data => {
      this.user = {
      address: data.body.body.address,
      email: data.body.body.email,
      firstName: data.body.body.firstName,
      id: data.body.body.id,
      lastName: data.body.body.lastName,
      password: data.body.body.password,
      zipcode: data.body.body.zipcode
      };
      result = true;
      localStorage.setItem('username', email);
      localStorage.setItem('password', password);
      localStorage.setItem('userId', this.user.id);
      callback(true);
    },
    error => {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      localStorage.removeItem('userId');
      callback(false);
      console.log(error);
    })
  
    return result;
  }

  logOut(){
    this.user = undefined;
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('userId');
    this.router.navigate(['home']);
  }

}
