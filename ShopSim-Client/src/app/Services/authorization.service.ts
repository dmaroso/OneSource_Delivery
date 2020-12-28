import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private cId = environment.kroger.clientId;
  private secret = environment.kroger.clientSecret;
  authUrl = environment.kroger.authUrl;
  apiUrl = environment.kroger.apiUrl;


  private requestHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${btoa(`${this.cId}:${this.secret}`)}`,
    'Accept': '*/*',
    'Cache-Control': 'no-cahe',
  });


  constructor(private httpClient: HttpClient) {}

  getToken(): Observable<any> {
    return this.httpClient.post<any>(this.authUrl, 'grant_type=client_credentials&scope=product.compact', {headers: this.requestHeaders, observe: 'body'})
  }
}
