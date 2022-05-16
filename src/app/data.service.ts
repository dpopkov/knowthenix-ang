import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from './model/Category';
import { KeyTerm } from './model/KeyTerm';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
    console.log('environment.restUrl=', environment.restUrl);
  }

  getCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(environment.restUrl + '/categories')
      .pipe(
        map(data => {
          const categories = new Array<Category>();
          for (const categoryData of data) {
            categories.push(Category.fromHttp(categoryData));
          }
          return categories;
        })
      );
  }

  getCategory(id: number) : Observable<Category> {
    return this.http.get<Category>(environment.restUrl + '/categories/' + id)
      .pipe(
        map(data => Category.fromHttp(data))
      );
  }

  updateCategory(toUpdate: Category): Observable<Category> {
    return of(null);
  }

  addCategory(newCategory: Category): Observable<Category> {
    return of(null);
  }

  deleteCategory(id: number): Observable<any> {
    return of(null);
  }

  getKeyTerms(): Observable<Array<KeyTerm>> {
    return this.http.get<Array<KeyTerm>>(environment.restUrl + '/keyterms')
      .pipe(
        map(data => {
          const keyterms = new Array<KeyTerm>();
          for (const keytermData of data) {
            keyterms.push(KeyTerm.fromHttp(keytermData));
          }
          return keyterms;
        })
      );
  }

  updateKeyTerm(keyTerm: KeyTerm): Observable<KeyTerm> {
    return of(null);
  }

  addKeyTerm(newKeyTerm: KeyTerm): Observable<KeyTerm> {
    return of(null);
  }

  deleteKeyTerm(id: number): Observable<any> {
    return of(null);
  }

  /*
                IMPORTANT !!!
    The signatures of all non-private methods in data.service.ts
    must be identical to the signatures of all methods
    in data.service.local.ts
  */
}
