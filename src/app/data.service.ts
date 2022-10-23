import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from './model/Category';
import { KeyTerm } from './model/KeyTerm';
import {Question} from "./model/Question";
import {Language} from "./model/Language";
import {Translation} from "./model/Translation";
import {Source} from "./model/Source";
import {Answer} from "./model/Answer";
import {IdChangeSet} from "./model/IdChangeSet";
import {AppUser} from "./model/AppUser";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly categoriesUrl = environment.restUrl + '/categories';
  private readonly keyTermsUrl = environment.restUrl + '/keyterms';
  private readonly questionsUrl = environment.restUrl + '/questions';
  private readonly answersUrl = environment.restUrl + '/answers';
  private readonly sourcesUrl = environment.restUrl + '/sources';
  private readonly usersUrl = environment.restUrl + '/users';
  private readonly authUrl = environment.restUrl + '/basicAuth/validate';

  public localID: string;
  private languageMap: Map<string, string>;
  private headersWithToken: HttpHeaders;

  constructor(private http: HttpClient, @Inject(LOCALE_ID) localId: string) {
    console.log('data.service.ts runs');
    console.log('environment.restUrl=', environment.restUrl);
    this.localID = localId;
    this.initLanguageMap();
  }

  setJwtToken(jwtToken: string) {
    if (jwtToken) {
      this.headersWithToken = new HttpHeaders().append('Authorization', 'Bearer ' + jwtToken);
    } else {
      this.headersWithToken = null;
    }
  }

  getCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(this.categoriesUrl, {headers: this.headersWithToken})
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
    return this.http.put<Category>(this.categoriesUrl, toUpdate, {headers: this.headersWithToken})
      .pipe(map(data => Category.fromHttp(data)));
  }

  addCategory(newCategory: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, newCategory, {headers: this.headersWithToken})
    .pipe(map(data => Category.fromHttp(data)));
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(this.categoriesUrl + '/' + id, {headers: this.headersWithToken});
  }

  getKeyTerms(): Observable<Array<KeyTerm>> {
    return this.http.get<Array<KeyTerm>>(this.keyTermsUrl, {headers: this.headersWithToken})
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
    return this.http.put<KeyTerm>(this.keyTermsUrl, keyTerm, {headers: this.headersWithToken})
      .pipe(map(data => KeyTerm.fromHttp(data)));
  }

  addKeyTerm(newKeyTerm: KeyTerm): Observable<KeyTerm> {
    return this.http.post<KeyTerm>(this.keyTermsUrl, newKeyTerm, {headers: this.headersWithToken})
      .pipe(map(data => KeyTerm.fromHttp(data)));
  }

  deleteKeyTerm(id: number): Observable<any> {
    return this.http.delete(this.keyTermsUrl + '/' + id, {headers: this.headersWithToken});
  }

  getQuestions(): Observable<Array<Question>> {
    return this.http.get<Array<Question>>(this.questionsUrl, {headers: this.headersWithToken})
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
    return this.http.get<Question>(this.questionsUrl + '/' + id, {headers: this.headersWithToken})
      .pipe(map(data => Question.fromHttp(data)));
  }

  getQuestionsByCreatedOn(createdOn: string): Observable<Array<Question>> {
    return this.http.get<Array<Question>>(this.questionsUrl + '/created/' + createdOn, {headers: this.headersWithToken})
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

  addNewQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.questionsUrl, question, {headers: this.headersWithToken})
      .pipe(map(data => Question.fromHttp(data)));
  }

  updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(this.questionsUrl, question, {headers: this.headersWithToken})
      .pipe(map(data => Question.fromHttp(data)));
  }

  getTranslationsByQuestionId(questionId: number): Observable<Array<Translation>> {
    return this.http.get<Array<Translation>>(this.questionsUrl + '/' + questionId + '/translations',
      {headers: this.headersWithToken})
      .pipe(map(data => {
        const translations = new Array<Translation>();
        for (const translationData of data) {
          translations.push(Translation.fromHttp(translationData));
        }
        return translations;
      }));
  }

  addTranslation(questionId: number, translation: Translation): Observable<Translation> {
    return this.http.post<Translation>(this.questionsUrl + '/' + questionId + '/translations', translation,
      {headers: this.headersWithToken})
      .pipe(map(data => Translation.fromHttp(data)));
  }

  updateTranslation(questionId: number, translation: Translation): Observable<Translation> {
    return this.http.put<Translation>(this.questionsUrl + '/' + questionId + '/translations', translation,
      {headers: this.headersWithToken})
      .pipe(map(data => Translation.fromHttp(data)));
  }

  getKeyTermsByQuestionId(questionId: number): Observable<Array<KeyTerm>> {
    return this.http.get<Array<KeyTerm>>(this.questionsUrl + '/' + questionId + '/keyterms',
      {headers: this.headersWithToken})
      .pipe(map(data => {
        const keyterms = new Array<KeyTerm>();
        for (const kt of data) {
          keyterms.push(KeyTerm.fromHttp(kt));
        }
        return keyterms;
      }));
  }

  patchKeyTermsByQuestionId(questionId: number, idChangeSet: IdChangeSet): Observable<Array<number>> {
    return this.http.patch<Array<number>>(this.questionsUrl + '/' + questionId + '/keyterms', idChangeSet,
      {headers: this.headersWithToken});
  }

  patchKeyTermsByAnswerId(answerId: number, idChangeSet: IdChangeSet): Observable<Array<number>> {
    return this.http.patch<Array<number>>(this.answersUrl + '/' + answerId + '/keyterms', idChangeSet,
      {headers: this.headersWithToken});
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
    return this.http.get<Array<Source>>(this.sourcesUrl, {headers: this.headersWithToken})
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
    return this.http.get<Source>(this.sourcesUrl + '/' + id, {headers: this.headersWithToken})
      .pipe(map(data => Source.from(data)));
  }

  addNewSource(source: Source): Observable<Source> {
    return this.http.post<Source>(this.sourcesUrl, source, {headers: this.headersWithToken})
      .pipe(map(data => Source.from(data)));
  }

  updateSource(source: Source): Observable<Source> {
    return this.http.put<Source>(this.sourcesUrl, source, {headers: this.headersWithToken})
      .pipe(map(data => Source.from(data)));
  }

  deleteSource(id: number): Observable<any> {
    return this.http.delete<Source>(this.sourcesUrl + '/' + id, {headers: this.headersWithToken});
  }

  addNewAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(this.answersUrl, answer, {headers: this.headersWithToken})
      .pipe(map(data => Answer.from(data)));
  }

  getAnswersForQuestion(questionId: number): Observable<Array<Answer>> {
    return this.http.get<Array<Answer>>(this.questionsUrl + '/' + questionId + '/answers',
      {headers: this.headersWithToken})
      .pipe(
        map(data => {
          const answers = new Array<Answer>();
          for (const answerData of data) {
            answers.push(Answer.from(answerData));
          }
          return answers;
        })
      );
  }

  getAnswerById(answerId: number): Observable<Answer> {
    return this.http.get<Answer>(this.answersUrl + '/' + answerId, {headers: this.headersWithToken})
      .pipe(map(data => Answer.from(data)));
  }

  updateAnswer(answer: Answer): Observable<Answer> {
    return this.http.put<Answer>(this.answersUrl, answer, {headers: this.headersWithToken})
      .pipe(map(data => Answer.from(data)));
  }

  getTranslationsByAnswerId(answerId: number): Observable<Array<Translation>> {
    return this.http.get<Array<Translation>>(this.answersUrl + '/' + answerId + '/translations',
      {headers: this.headersWithToken})
      .pipe(map(data => {
        const translations = new Array<Translation>();
        for (const translationData of data) {
          translations.push(Translation.fromHttp(translationData));
        }
        return translations;
      }));
  }

  addAnswerTranslation(answerId: number, translation: Translation): Observable<Translation> {
    return this.http.post<Translation>(this.answersUrl + '/' + answerId + '/translations', translation,
      {headers: this.headersWithToken})
      .pipe(map(data => Translation.fromHttp(data)));
  }

  updateAnswerTranslation(answerId: number, translation: Translation): Observable<Translation> {
    return this.http.put<Translation>(this.answersUrl + '/' + answerId + '/translations', translation,
      {headers: this.headersWithToken})
      .pipe(map(data => Translation.fromHttp(data)));
  }

  getKeyTermsByAnswerId(answerId: number): Observable<Array<KeyTerm>> {
    return this.http.get<Array<KeyTerm>>(this.answersUrl + '/' + answerId + '/keyterms',
      {headers: this.headersWithToken})
      .pipe(map(data => {
        const keyterms = new Array<KeyTerm>();
        for (const kt of data) {
          keyterms.push(KeyTerm.fromHttp(kt));
        }
        return keyterms;
      }));
  }

  deleteAnswer(id: number): Observable<any> {
    return this.http.delete(this.answersUrl + '/' + id, {headers: this.headersWithToken});
  }

  getAppUsers(): Observable<Array<AppUser>> {
    return this.http.get<Array<AppUser>>(this.usersUrl, {headers: this.headersWithToken})
      .pipe(
        map(data => {
          const users = new Array<AppUser>();
          for (const userData of data) {
            users.push(AppUser.fromHttp(userData));
          }
          return users;
        })
      );
  }

  updateAppUser(toUpdate: AppUser): Observable<AppUser> {
    return this.http.put<AppUser>(this.usersUrl, toUpdate, {headers: this.headersWithToken})
      .pipe(map(data => AppUser.fromHttp(data)));
  }

  addAppUser(appUser: AppUser, userPassword: string): Observable<AppUser> {
    const userToCreate = {
      name: appUser.name,
      password: userPassword
    };
    return this.http.post<AppUser>(this.usersUrl, userToCreate, {headers: this.headersWithToken})
      .pipe(map(data => AppUser.fromHttp(data)));
  }

  deleteAppUser(appUserId: number): Observable<any> {
    return this.http.delete(this.usersUrl + '/' + appUserId, {headers: this.headersWithToken});
  }

  resetUserPassword(appUserId: number): Observable<any> {
    return this.http.put(this.usersUrl + '/resetPassword/' + appUserId, null,
      {headers: this.headersWithToken});;
  }

  validateUser(name: string, password: string): Observable<{result: string}> {
    const authData = btoa(`${name}:${password}`);
    const headers = new HttpHeaders().append('Authorization', 'Basic ' + authData);
    return this.http.get<{result: string}>(this.authUrl, {headers: headers});
  }

  /*
                IMPORTANT !!!
    The signatures of all non-private methods in data.service.ts
    must be identical to the signatures of all methods
    in data.service.local.ts
  */
}
