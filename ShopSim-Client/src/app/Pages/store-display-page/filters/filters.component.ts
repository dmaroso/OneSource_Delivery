import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FilterServiceService } from 'src/app/Services/filter-service.service';
import { StoreService } from 'src/app/Services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  filterLimit: number = 5;
  filterBrand: string = '';

  constructor(private filterService: FilterServiceService, public StoreService: StoreService) { }

  ngOnInit() {
    this.filterService.filter = this;
  }

  filter(){
    this.filterService.search?.onSearchClick()
  }

}
