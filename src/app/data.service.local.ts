import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Category} from './model/Category';
import {KeyTerm} from './model/KeyTerm';
import {Language, Question} from "./model/Question";
import {Translation} from "./model/Translation";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private categories: Array<Category> = new Array<Category>();
  private keyTerms: Array<KeyTerm> = new Array<KeyTerm>();
  private questions: Array<Question> = new Array<Question>();
  private languageMap: Map<string, string>;

  constructor(private http: HttpClient) {
    console.log('data.service.local.ts runs');
    console.log('environment.restUrl=', environment.restUrl);

    this.initLanguageMap();
    this.initCategories();
    this.initKeyTerms();
    this.initQuestions(this.categories[0]);
  }

  private initCategories(): void {
    const category1 = new Category(1, 'Category 1 (local data)', 'Description 1');
    const category2 = new Category(2, 'Category 2 (local data)', 'Description 2');
    this.categories.push(category1);
    this.categories.push(category2);
  }

  private initKeyTerms(): void {
    this.keyTerms.push(new KeyTerm(3, 'KeyTerm 1 (local data)', 'Description 1'));
    this.keyTerms.push(new KeyTerm(4, 'KeyTerm 2 (local data)', 'Description 2'));
  }

  private initQuestions(category: Category): void {
    const translationJvmEn = new Translation(41, 'EN', 'PLAINTEXT', 'What is JVM? (local data)');
    const translationJvmRu = new Translation(42, 'RU', 'PLAINTEXT', 'Что такое JVM? (local data)');
    const jvm = new Question(31, category, 'EN', [translationJvmEn, translationJvmRu]);
    this.questions.push(jvm);
    const translationJreEn = new Translation(43, 'EN', 'PLAINTEXT', 'What is JRE? (local data)');
    const translationJreRu = new Translation(44, 'RU', 'PLAINTEXT', 'Что такое JRE? (local data)');
    const jre = new Question(32, category, 'RU', [translationJreEn, translationJreRu] );
    this.questions.push(jre);
    const empty = new Question(33, category, 'EN');
    this.questions.push(empty);
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

  getQuestions(): Observable<Array<Question>> {
    return of(this.questions);
  }

  getQuestionById(id: number): Observable<Question> {
    const found: Question = this.questions.find(q => q.id === id);
    return of(found);
  }

  updateQuestion(question: Question): Observable<Question> {
    const existing: Question = this.questions.find(q => q.id === question.id);
    question.copyTo(existing);
    return of(existing);
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
    The signatures of all non-private methods in data.service.local.ts
    must be identical to the signatures of all methods
    in data.service.ts
  */
}
