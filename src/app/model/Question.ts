import {Category} from "./Category";
import {Translation} from "./Translation";
import {KeyTerm} from "./KeyTerm";

export class Question {

  // The keyterms used in local version only.
  keyterms: Array<KeyTerm>;

  constructor(public id?: number,
              public category?: Category,
              public selectedLanguage?: string,
              public createdAt?: string,
              public translations: Array<Translation> = new Array<Translation>(),
              public displayTranslation?: Translation) {
    if (!displayTranslation) {
      this.computeDisplayTranslation();
    }
  }

  getCreatedAtAsDate(): Date {
    if (this.createdAt) {
      return new Date(this.createdAt);
    } else {
      return new Date();
    }
  }

  computeDisplayTranslation(): void {
    if (this.selectedLanguage && this.translations) {
      this.displayTranslation = this.translations.find(tr => tr.language === this.selectedLanguage);
    }
  }

  computeLanguageFromDisplayTranslation(): void {
    if (this.displayTranslation) {
      this.selectedLanguage = this.displayTranslation.language;
    }
  }

  isNew(): boolean {
    return this.id == null;
  }

  copyTo(other: Question): Question {
    other.category = this.category;
    other.selectedLanguage = this.selectedLanguage;
    other.createdAt = this.createdAt;
    other.translations = this.translations;
    other.displayTranslation = this.displayTranslation;
    return other;
  }

  static fromHttp(obj: Question): Question {
    const translations = new Array<Translation>();
    for (const translationData of obj.translations) {
      translations.push(Translation.fromHttp(translationData))
    }
    return new Question(obj.id,
      Category.fromHttp(obj.category), obj.selectedLanguage, obj.createdAt,
      translations)
  }

  addKeyterm(keyterm: KeyTerm): void {
    if (this.keyterms == null) {
      this.keyterms = new Array<KeyTerm>();
    }
    this.keyterms.push(keyterm);
  }

  removeKeyterm(keyterm: KeyTerm): void {
    if (this.keyterms != null) {
      const idx = this.keyterms.findIndex(kt => kt.id === keyterm.id);
      this.keyterms.splice(idx, 1);
    }
  }
}
