import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/Services/store.service';
import { Store } from 'src/app/Models/Store';


@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.css']
})
export class StoreInfoComponent implements OnInit {

  store? : Store;

  constructor(private StoreService: StoreService) { }

  ngOnInit(): void {
    this.store = this.StoreService.currentStore; 
  }

}
