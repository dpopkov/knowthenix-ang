import { Injectable } from '@angular/core';
import { Category } from './model/Category';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  categories: Array<Category> = new Array<Category>();

  constructor() {
    const category1 = new Category(1, 'Category 1', 'Description 1');
    const category2 = new Category(2, 'Category 2', 'Description 2');
    this.categories.push(category1);
    this.categories.push(category2);
  }
}
