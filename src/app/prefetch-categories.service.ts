import { Injectable } from '@angular/core';
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {Category} from "./model/Category";
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class PrefetchCategoriesService implements Resolve<Observable<Array<Category>>>{

  constructor(private dataService: DataService) {}

  resolve(): Observable<Array<Category>> {
    return this.dataService.getCategories();
  }
}
