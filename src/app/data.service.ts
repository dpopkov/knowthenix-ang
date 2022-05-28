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

  private readonly categoriesUrl = environment.restUrl + '/categories';
  private readonly keyTermsUrl = environment.restUrl + '/keyterms';
  private readonly questionsUrl = environment.restUrl + '/questions';

  private languageMap: Map<string, string>;

  constructor(private http: HttpClient) {
    console.log('data.service.ts runs');
    console.log('environment.restUrl=', environment.restUrl);
    this.initLanguageMap();
  }

  getCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(this.categoriesUrl)
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
    return this.http.put<Category>(this.categoriesUrl, toUpdate)
      .pipe(map(data => Category.fromHttp(data)));
  }

  addCategory(newCategory: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, newCategory)
    .pipe(map(data => Category.fromHttp(data)));
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(this.categoriesUrl + '/' + id);
  }

  getKeyTerms(): Observable<Array<KeyTerm>> {
    return this.http.get<Array<KeyTerm>>(this.keyTermsUrl)
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
    return this.http.put<KeyTerm>(this.keyTermsUrl, keyTerm)
      .pipe(map(data => KeyTerm.fromHttp(data)));
  }

  addKeyTerm(newKeyTerm: KeyTerm): Observable<KeyTerm> {
    return this.http.post<KeyTerm>(this.keyTermsUrl, newKeyTerm)
      .pipe(map(data => KeyTerm.fromHttp(data)));
  }

  deleteKeyTerm(id: number): Observable<any> {
    return this.http.delete(this.keyTermsUrl + '/' + id);
  }

  getQuestions(): Observable<Array<Question>> {
    return this.http.get<Array<Question>>(this.questionsUrl)
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
    return this.http.get<Question>(this.questionsUrl + '/' + id)
      .pipe(map(data => Question.fromHttp(data)));
  }

  updateQuestion(question: Question): Observable<Question> {
    console.log('NOT IMPLEMENTED: data.service.ts:updateQuestion id=', question.id);
    return of(null);
  }

  getLanguageMap(): Map<string, string> {
    return this.languageMap;
  }

  private initLanguageMap(): void {
    const keys = Object.keys(Language);
    const map: Map<string, string> = new Map<string, string>();
    for (let key of keys) {
      map.set(key, Language[key]);
    }
    this.languageMap = map;
  }

  /*
                IMPORTANT !!!
    The signatures of all non-private methods in data.service.ts
    must be identical to the signatures of all methods
    in data.service.local.ts
  */
}
