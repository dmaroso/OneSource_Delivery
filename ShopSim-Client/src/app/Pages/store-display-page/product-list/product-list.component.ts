import { Component, OnInit, Output } from '@angular/core';
import { ItemRetreivalKrogerService } from 'src/app/Services/item-retreival-Kroger.service';
import { StoreService } from 'src/app/Services/store.service';
import { Store } from 'src/app/Models/Store';
import { ItemRetreivalWalmartService } from 'src/app/Services/item-retreival-walmart.service';
import { Item } from 'src/app/Models/Item';
import { FilterServiceService } from 'src/app/Services/filter-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  filterTerms: string = '';

  store?: Store;

  @Output()
  items: Item[] = [];

  constructor(private krogerRetreival: ItemRetreivalKrogerService, private walmartRetreival: ItemRetreivalWalmartService,
    private StoreService: StoreService, private filterService: FilterServiceService) { }

  ngOnInit(): void {
    this.store = this.StoreService.currentStore;
    this.filterService.search = this;
  }

  onSearchClick() {
    if (sessionStorage.getItem('storeName') == 'Walmart') {
      if (this.filterService.filter) {
        this.walmartRetreival.requestItemByTerm(this.filterTerms, this.filterService.filter?.filterLimit)
          .subscribe(resp => {
            this.items = resp;
            console.log(resp);
          })
      }
    } else {
      if (this.filterService.filter) {
        this.krogerRetreival.requestItemByTerm(this.filterTerms, this.filterService.filter?.filterLimit, this.filterService.filter?.filterBrand)
          .subscribe(resp => {
            this.items = resp;
            console.log(resp);
          })
      }
    }
  }
}
