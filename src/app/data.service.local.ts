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

  getCategories(): Observable<Array<Category>> {
    return of(this.categories);
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

  deleteCategory(id: number): Observable<any> {
    const ct = this.categories.find(c => c.id === id);
    this.categories.splice(this.categories.indexOf(ct), 1);
    return of(null);
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

  deleteKeyTerm(id: number): Observable<any> {
    const kt = this.keyTerms.find(k => k.id === id);
    this.keyTerms.splice(this.keyTerms.indexOf(kt), 1);
    return of(null);
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

  /*
                IMPORTANT !!!
    The signatures of all non-private methods in data.service.local.ts
    must be identical to the signatures of all methods
    in data.service.ts
  */
}