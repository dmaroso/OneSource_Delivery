import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/Services/store.service';
import { Router} from '@angular/router'
import { Store } from 'src/app/Models/Store';
import { zip } from 'lodash';

@Component({
  selector: 'app-zip-code-page',
  templateUrl: './zip-code-page.component.html',
  styleUrls: ['./zip-code-page.component.css']
})
export class ZipCodePageComponent implements OnInit {

  constructor(private router : Router, private storeService : StoreService) { }

  public zipcode : String = '';
  public errorMessage? : String = undefined;

  ngOnInit(): void {
  
  }

  checkZipCode(){

    console.log(this.zipcode);
    this.storeService.getStores(this.handleResult.bind(this), this.zipcode);

  }

  handleResult(s : Store[]) {
      if (s == undefined || s.length == 0) {
        this.errorMessage = '<div class="alert alert-warning" role="alert"> Sorry, we don\'t service that area yet.</div>';
      } else {
        this.router.navigate(['createAccount']);
      }

  }




}
