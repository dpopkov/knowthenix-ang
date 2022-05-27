import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from './model/Category';
import { KeyTerm } from './model/KeyTerm';
import {Language, Question} from "./model/Question";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
    console.log('data.service.ts runs');
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

  updateCategory(toUpdate: Category): Observable<Category> {
    return this.http.put<Category>(environment.restUrl + '/categories', toUpdate)
      .pipe(map(data => Category.fromHttp(data)));
  }

  addCategory(newCategory: Category): Observable<Category> {
    return this.http.post<Category>(environment.restUrl + '/categories', newCategory)
    .pipe(map(data => Category.fromHttp(data)));
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(environment.restUrl + '/categories/' + id);
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
    return this.http.put<KeyTerm>(environment.restUrl + '/keyterms', keyTerm)
      .pipe(map(data => KeyTerm.fromHttp(data)));
  }

  addKeyTerm(newKeyTerm: KeyTerm): Observable<KeyTerm> {
    return this.http.post<KeyTerm>(environment.restUrl + '/keyterms', newKeyTerm)
      .pipe(map(data => KeyTerm.fromHttp(data)));
  }

  deleteKeyTerm(id: number): Observable<any> {
    return this.http.delete(environment.restUrl + '/keyterms/' + id);
  }

  getQuestions(): Observable<Array<Question>> {
    return this.http.get<Array<Question>>(environment.restUrl + '/questions')
      .pipe(
        map(data => {
          const questions = new Array<Question>();
          for (const questionData of data) {
            questions.push(Question.fromHttp(questionData));
          }
          return questions;
        })
      );
  }

  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(environment.restUrl + '/questions/' + id)
      .pipe(map(data => Question.fromHttp(data)));
  }

  updateQuestion(question: Question): Observable<Question> {
    console.log('NOT IMPLEMENTED: data.service.ts:updateQuestion id=', question.id);
    return of(null);
  }

  getLanguageMap(): Map<string, string> {
    const keys = Object.keys(Language);
    const languageMap: Map<string, string> = new Map<string, string>();
    for (let key of keys) {
      languageMap.set(key, Language[key]);
    }
    return languageMap;
  }

  /*
                IMPORTANT !!!
    The signatures of all non-private methods in data.service.ts
    must be identical to the signatures of all methods
    in data.service.local.ts
  */
}
