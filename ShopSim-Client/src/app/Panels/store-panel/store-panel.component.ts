import { Component, OnInit,  Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from 'src/app/Models/Store';
import { StoreService } from 'src/app/Services/store.service';

@Component({
  selector: 'app-store-panel',
  templateUrl: './store-panel.component.html',
  styleUrls: ['./store-panel.component.css']
})
export class StorePanelComponent implements OnInit {


  @Input() public store : Store = {id : 0, name:"Kroger", logoUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Kroger_logo_%281961-2019%29.svg/1243px-Kroger_logo_%281961-2019%29.svg.png", address : "San Antonio, TX", zipcode : 78201};
  

  constructor(private storeService : StoreService, private router : Router) { }

  ngOnInit(): void {
  }


  public openStore(){
    this.storeService.currentStore = this.store;
    sessionStorage.setItem('storeId', this.store.id.toString())
    sessionStorage.setItem('storeName', this.store.name)
    this.router.navigate(['store'], { queryParams: { id: this.store.id } })
  }


}
