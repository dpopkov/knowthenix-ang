import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from './model/Category';
import { KeyTerm } from './model/KeyTerm';
import {Question} from "./model/Question";
import {Language} from "./model/Language";
import {Translation} from "./model/Translation";
import {Source} from "./model/Source";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly categoriesUrl = environment.restUrl + '/categories';
  private readonly keyTermsUrl = environment.restUrl + '/keyterms';
  private readonly questionsUrl = environment.restUrl + '/questions';
  private readonly sourcesUrl = environment.restUrl + '/sources';

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

  addNewQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.questionsUrl, question)
      .pipe(map(data => Question.fromHttp(data)));
  }

  updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(this.questionsUrl, question)
      .pipe(map(data => Question.fromHttp(data)));
  }

  getTranslationsByQuestionId(questionId: number): Observable<Array<Translation>> {
    return this.http.get<Array<Translation>>(this.questionsUrl + '/' + questionId + '/translations')
      .pipe(map(data => {
        const translations = new Array<Translation>();
        for (const translationData of data) {
          translations.push(Translation.fromHttp(translationData));
        }
        return translations;
      }));
  }

  addTranslation(questionId: number, translation: Translation): Observable<Translation> {
    return this.http.post<Translation>(this.questionsUrl + '/' + questionId + '/translations', translation)
      .pipe(map(data => Translation.fromHttp(data)));
  }

  updateTranslation(questionId: number, translation: Translation): Observable<Translation> {
    return this.http.put<Translation>(this.questionsUrl + '/' + questionId + '/translations', translation)
      .pipe(map(data => Translation.fromHttp(data)));
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

  getSources(): Observable<Array<Source>> {
    return this.http.get<Array<Source>>(this.sourcesUrl)
      .pipe(
        map(data => {
          const sources = new Array<Source>();
          for (const sourceData of data) {
            sources.push(Source.from(sourceData));
          }
          return sources;
        })
      )
  }

  getSourceById(id: number): Observable<Source> {
    return this.http.get<Source>(this.sourcesUrl + '/' + id)
      .pipe(map(data => Source.from(data)));
  }

  addNewSource(source: Source): Observable<Source> {
    return this.http.post<Source>(this.sourcesUrl, source)
      .pipe(map(data => Source.from(data)));
  }

  updateSource(source: Source): Observable<Source> {
    return this.http.put<Source>(this.sourcesUrl, source)
      .pipe(map(data => Source.from(data)));
  }

  deleteSource(id: number): Observable<any> {
    return this.http.delete<Source>(this.sourcesUrl + '/' + id);
  }

  /*
                IMPORTANT !!!
    The signatures of all non-private methods in data.service.ts
    must be identical to the signatures of all methods
    in data.service.local.ts
  */
}
