import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from './model/Category';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // categories: Array<Category> = new Array<Category>();

  // Prepare for REST
  private categories: Array<Category> = new Array<Category>();

  constructor(private http: HttpClient) {
    console.log('environment.restUrl=', environment.restUrl);

    const category1 = new Category(1, 'Category 1', 'Description 1');
    const category2 = new Category(2, 'Category 2', 'Description 2');
    this.categories.push(category1);
    this.categories.push(category2);
  }

  // Prepare for REST
  getCategories(): Observable<Array<Category>> {
    return of(this.categories);
  }

  getCategory(id: number) : Observable<Category> {
    console.log('data.service.ts: getCategory by id=', id);
    return this.http.get<Category>(environment.restUrl + '/categories/' + id);
  }

  updateCategory(toUpdate: Category): Observable<Category> {
    const originalCategory = this.categories.find((category) => category.id === toUpdate.id);
    originalCategory.name = toUpdate.name;
    originalCategory.description = toUpdate.description;
    return of(originalCategory);
  }
}
