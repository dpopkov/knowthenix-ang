import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from './model/Category';
import { KeyTerm } from './model/KeyTerm';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // categories: Array<Category> = new Array<Category>();

  // Prepare for REST
  private categories: Array<Category> = new Array<Category>();
  private keyTerms: Array<KeyTerm> = new Array<KeyTerm>();

  constructor(private http: HttpClient) {
    console.log('environment.restUrl=', environment.restUrl);

    const category1 = new Category(1, 'Category 1', 'Description 1');
    const category2 = new Category(2, 'Category 2', 'Description 2');
    this.categories.push(category1);
    this.categories.push(category2);
    this.keyTerms.push(new KeyTerm(3, 'KeyTerm 1', 'Description 1'));
    this.keyTerms.push(new KeyTerm(4, 'KeyTerm 2', 'Description 2'));
  }

  // Prepare for REST
  getCategories(): Observable<Array<Category>> {
    return of(this.categories);
  }

  getCategory(id: number) : Observable<Category> {
    return this.http.get<Category>(environment.restUrl + '/categories/' + id);
  }

  updateCategory(toUpdate: Category): Observable<Category> {
    const originalCategory = this.categories.find((category) => category.id === toUpdate.id);
    originalCategory.name = toUpdate.name;
    originalCategory.description = toUpdate.description;
    return of(originalCategory);
  }

  addCategory(newCategory: Category): Observable<Category> {
    let maxId = 0;
    for (const c of this.categories) {
      if (c.id > maxId) {
        maxId = c.id;
      }
    }
    newCategory.id = maxId + 1;
    this.categories.push(newCategory);
    return of(newCategory);
  }

  getKeyTerms(): Observable<Array<KeyTerm>> {
    return of(this.keyTerms);
  }

  updateKeyTerm(keyTerm: KeyTerm): Observable<KeyTerm> {
    const original = this.keyTerms.find(kt => kt.id === keyTerm.id);
    if (original) {
      original.name = keyTerm.name;
      original.description = keyTerm.description;
    }
    return of(original);
  }

  addKeyTerm(newKeyTerm: KeyTerm): Observable<KeyTerm> {
    newKeyTerm.id = this.findKeyTermMaxId() + 1;
    this.keyTerms.push(newKeyTerm);
    return of(newKeyTerm);
  }

  private findKeyTermMaxId(): number {
    let maxId = 0;
    for (const kt of this.keyTerms) {
      if (kt.id > maxId) {
        maxId = kt.id;
      }
    }
    return maxId;
  }
}
