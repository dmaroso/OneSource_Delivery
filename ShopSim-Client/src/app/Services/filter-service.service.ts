import { Injectable } from '@angular/core';
import { FiltersComponent } from '../Pages/store-display-page/filters/filters.component';
import { ProductListComponent } from '../Pages/store-display-page/product-list/product-list.component';

@Injectable({
  providedIn: 'root'
})
export class FilterServiceService {

  public filter?: FiltersComponent;
  public search?: ProductListComponent;

  constructor() { }
}
