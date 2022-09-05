import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Category} from './model/Category';
import {KeyTerm} from './model/KeyTerm';
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

  private categories: Array<Category> = new Array<Category>();
  private keyTerms: Array<KeyTerm> = new Array<KeyTerm>();
  private questions: Array<Question> = new Array<Question>();
  private sources: Array<Source> = new Array<Source>();
  private answers: Array<Answer> = new Array<Answer>();
  private appUsers: Array<AppUser> = new Array<AppUser>();
  private languageMap: Map<string, string>;
  private lastQuestionId = 100;
  private lastAnswerId = 1000;
  private lastTranslationId = 2000;

  constructor(private http: HttpClient) {
    console.log('data.service.local.ts runs');
    console.log('environment.restUrl=', environment.restUrl);

    this.initLanguageMap();
    this.initCategories();
    this.initKeyTerms();
    this.initQuestions(this.categories[0]);
    this.initSources();
    this.initAnswers();
    this.initAppUsers();
  }

  private initCategories(): void {
    const category1 = new Category(1, 'Category 1 (local data)', 'Description 1');
    const category2 = new Category(2, 'Category 2 (local data)', 'Description 2');
    this.categories.push(category1);
    this.categories.push(category2);
  }

  private readonly JVM_KEYTERM = 3;
  private readonly JRE_KEYTERM = 4;

  private initKeyTerms(): void {
    this.keyTerms.push(new KeyTerm(this.JVM_KEYTERM, 'JVM KeyTerm (local data)', 'Description 1'));
    this.keyTerms.push(new KeyTerm(this.JRE_KEYTERM, 'JRE KeyTerm (local data)', 'Description 2'));
  }

  private initQuestions(category: Category): void {
    const translationJvmEn = new Translation(41, 'EN', 'PLAINTEXT', 'What is JVM? (local data)');
    const translationJvmRu = new Translation(42, 'RU', 'PLAINTEXT', 'Что такое JVM? (local data)');
    const jvm = new Question(31, category, 'EN', [translationJvmEn, translationJvmRu]);
    jvm.addKeyterm(this.findKeyTermByIdLocally(this.JVM_KEYTERM));
    this.questions.push(jvm);
    const translationJreEn = new Translation(43, 'EN', 'PLAINTEXT', 'What is JRE? (local data)');
    const translationJreRu = new Translation(44, 'RU', 'PLAINTEXT', 'Что такое JRE? (local data)');
    const jre = new Question(32, category, 'RU', [translationJreEn, translationJreRu] );
    jre.addKeyterm(this.findKeyTermByIdLocally(this.JRE_KEYTERM));
    this.questions.push(jre);
    const empty = new Question(33, category, 'EN');
    this.questions.push(empty);
  }

  private initSources(): void {
    this.sources.push(new Source(201, 'JDK', 'JDK API', 'http://www.api.org',
      'API_DOC', 'JDK API Documentation'))
    this.sources.push(new Source(202, 'Core Java 11', 'Core Java, 11th Edition', 'http://www.core.org',
      'BOOK', 'Core Java by Cay Horstmann'))
    this.sources.push(new Source(203, 'Wikipedia', 'Wikipedia - The Free Encyclopedia', 'https://en.wikipedia.org',
      'WEB_SITE', ''))
  }

  private initAnswers() {
    const jvmQuestionId = 31;
    const translationJvm1En = new Translation(51, 'EN', 'PLAINTEXT', 'JVM is Java Virtual Machine (local data)');
    const translationJvm1Ru = new Translation(52, 'RU', 'PLAINTEXT', 'JVM это Виртуальная Машина Java (local data)');
    const jvm1 = new Answer(301, jvmQuestionId, 202, 'Core Java 11',
      'page 123', 'EN', [translationJvm1En, translationJvm1Ru], translationJvm1En);
    jvm1.addKeyterm(this.findKeyTermByIdLocally(this.JVM_KEYTERM));
    this.answers.push(jvm1);

    const translationJvm2En = new Translation(53, 'EN', 'PLAINTEXT', 'JVM is a virtual machine that enables a computer to run Java programs (local data)');
    const translationJvm2Ru = new Translation(54, 'RU', 'PLAINTEXT', 'JVM это виртуальная Машина позволяющая компьютеру выполнять Java программы (local data)');
    const jvm2 = new Answer(302, jvmQuestionId, 203, 'Wikipedia',
      'https://en.wikipedia.org/wiki/Java_virtual_machine', 'EN',
      [translationJvm2En, translationJvm2Ru], translationJvm2En);
    jvm2.addKeyterm(this.findKeyTermByIdLocally(this.JVM_KEYTERM));
    this.answers.push(jvm2);
  }

  private initAppUsers() {
    this.appUsers.push(new AppUser(1, 'James'));
    this.appUsers.push(new AppUser(2, 'Alice'));
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
    const found: Question = this.findQuestionLocally(id);
    return of(found);
  }

  addNewQuestion(question: Question): Observable<Question> {
    this.lastQuestionId++;
    question.id = this.lastQuestionId;
    for(const tr of question.translations) {
      this.ensureTranslationLocalIdIsAssigned(tr);
    }
    this.questions.push(question);
    return of(question);
  }

  updateQuestion(question: Question): Observable<Question> {
    const existing: Question = this.findQuestionLocally(question.id);
    question.copyTo(existing);
    return of(existing);
  }

  getTranslationsByQuestionId(questionId: number): Observable<Array<Translation>> {
    const foundQuestion: Question = this.findQuestionLocally(questionId);
    return of(foundQuestion.translations);
  }

  addTranslation(questionId: number, translation: Translation): Observable<Translation> {
    const foundQuestion: Question = this.findQuestionLocally(questionId);
    this.ensureTranslationLocalIdIsAssigned(translation);
    foundQuestion.translations.push(translation);
    return of(translation);
  }

  private ensureTranslationLocalIdIsAssigned(translation: Translation) {
    if (!translation.id) {
      this.lastTranslationId++;
      translation.id = this.lastTranslationId;
    }
  }

  updateTranslation(questionId: number, translation: Translation): Observable<Translation> {
    const foundQuestion: Question = this.findQuestionLocally(questionId);
    const foundTranslation = foundQuestion.translations.find(tr => tr.id === translation.id);
    const copied = translation.copyTo(foundTranslation);
    return of(copied);
  }

  getKeyTermsByQuestionId(questionId: number): Observable<Array<KeyTerm>> {
    const question = this.findQuestionLocally(questionId);
    return of(question.keyterms);
  }

  patchKeyTermsByQuestionId(questionId: number, idChangeSet: IdChangeSet): Observable<Array<number>> {
    const question = this.findQuestionLocally(questionId);
    if (idChangeSet.add) {
      idChangeSet.add.forEach(ktId => {
        const keyterm = this.findKeyTermByIdLocally(ktId);
        question.addKeyterm(keyterm);
      })
    }
    if (idChangeSet.remove) {
      idChangeSet.remove.forEach(ktId => {
        const keyterm = this.findKeyTermByIdLocally(ktId);
        question.removeKeyterm(keyterm);
      })
    }
    const result = new Array<number>();
    question.keyterms.forEach(kt => {
      result.push(kt.id);
    })
    return of(result);
  }

  patchKeyTermsByAnswerId(answerId: number, idChangeSet: IdChangeSet): Observable<Array<number>> {
    const answer = this.findLocalAnswerById(answerId);
    if (idChangeSet.add) {
      idChangeSet.add.forEach(ktId => {
        const keyterm = this.findKeyTermByIdLocally(ktId);
        answer.addKeyterm(keyterm);
      })
    }
    if (idChangeSet.remove) {
      idChangeSet.remove.forEach(ktId => {
        const keyterm = this.findKeyTermByIdLocally(ktId);
        answer.removeKeyterm(keyterm);
      })
    }
    const result = new Array<number>();
    answer.keyterms.forEach(kt => {
      result.push(kt.id);
    })
    return of(result);
  }

  private findKeyTermByIdLocally(keytermId: number): KeyTerm {
    return this.keyTerms.find(kt => kt.id === keytermId);
  }

  private findQuestionLocally(questionId: number): Question {
    return this.questions.find(q => q.id === questionId);
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
    return of(this.sources);
  }

  getSourceById(id: number): Observable<Source> {
    const found: Source = this.findSourceLocally(id);
    return of(found);
  }

  addNewSource(source: Source): Observable<Source> {
    source.id = this.findSourceMaxId() + 1;
    this.sources.push(source);
    return of(source);
  }

  updateSource(source: Source): Observable<Source> {
    const existing = this.findSourceLocally(source.id);
    source.copyTo(existing);
    return of(existing);
  }

  deleteSource(id: number): Observable<any> {
    const found: Source = this.findSourceLocally(id);
    this.sources.splice(this.sources.indexOf(found), 1);
    return of(null);
  }

  private findSourceLocally(sourceId: number): Source {
    return this.sources.find(s => s.id === sourceId);
  }

  private findSourceMaxId(): number {
    let maxId = 0;
    for (const s of this.sources) {
      if (s.id > maxId) {
        maxId = s.id;
      }
    }
    return maxId;
  }

  addNewAnswer(answer: Answer): Observable<Answer> {
    this.lastAnswerId++;
    answer.id = this.lastAnswerId;
    for (const tr of answer.translations) {
      this.ensureTranslationLocalIdIsAssigned(tr);
    }
    this.answers.push(answer);
    return of(answer);
  }

  getAnswersForQuestion(questionId: number): Observable<Array<Answer>> {
    const result = this.answers.filter(a => a.questionId === questionId);
    return of(result);
  }

  getAnswerById(answerId: number): Observable<Answer> {
    const found = this.findLocalAnswerById(answerId);
    return of(found);
  }

  updateAnswer(answer: Answer): Observable<Answer> {
    const found = this.findLocalAnswerById(answer.id);
    answer.copyTo(found);
    return of(found);
  }

  private findLocalAnswerById(answerId: number) {
    return this.answers.find(a => a.id === answerId);
  }

  getTranslationsByAnswerId(answerId: number): Observable<Array<Translation>> {
    const foundAnswer: Answer = this.findLocalAnswerById(answerId);
    return of(foundAnswer.translations);
  }

  addAnswerTranslation(answerId: number, translation: Translation): Observable<Translation> {
    const foundAnswer: Answer = this.findLocalAnswerById(answerId);
    this.ensureTranslationLocalIdIsAssigned(translation);
    foundAnswer.translations.push(translation);
    return of(translation);
  }

  updateAnswerTranslation(answerId: number, translation: Translation): Observable<Translation> {
    const foundAnswer = this.findLocalAnswerById(answerId);
    const foundTranslation = foundAnswer.translations.find(tr => tr.id === translation.id);
    const copied = translation.copyTo(foundTranslation);
    return of(copied);
  }

  getKeyTermsByAnswerId(answerId: number): Observable<Array<KeyTerm>> {
    const answer = this.findLocalAnswerById(answerId);
    return of(answer.keyterms);
  }

  deleteAnswer(id: number): Observable<any> {
    const a = this.answers.find(ans => ans.id === id);
    this.answers.splice(this.answers.indexOf(a), 1);
    return of(null);
  }

  getAppUsers(): Observable<Array<AppUser>> {
    return of(this.appUsers);
  }

  updateAppUser(toUpdate: AppUser): Observable<AppUser> {
    const original = this.appUsers.find(u => u.id === toUpdate.id);
    original.name = toUpdate.name;
    return of(original);
  }

  addAppUser(appUser: AppUser, password: string): Observable<AppUser> {
    const maxId = this.findMaxUserIdLocally();
    appUser.id = maxId + 1;
    // the password is not used in local data service
    this.appUsers.push(appUser);
    return of(appUser);
  }

  private findMaxUserIdLocally(): number {
    let maxId = 0;
    this.appUsers.forEach(u => {
      if (u.id > maxId) {
        maxId = u.id;
      }
    })
    return maxId;
  }

  /*
                IMPORTANT !!!
    The signatures of all non-private methods in data.service.local.ts
    must be identical to the signatures of all methods
    in data.service.ts
  */
}
