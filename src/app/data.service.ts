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

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Array<Category>> {
    return of(null);
  }

  getCategory(id: number) : Observable<Category> {
    return this.http.get<Category>(environment.restUrl + '/categories/' + id);
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
    return of(null);
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
}
