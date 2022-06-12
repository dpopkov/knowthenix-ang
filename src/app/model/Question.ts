import {Category} from "./Category";
import {Translation} from "./Translation";

export class Question {

  constructor(public id?: number,
              public category?: Category,
              public selectedLanguage?: String,
              public translations: Array<Translation> = new Array<Translation>(),
              public displayTranslation?: Translation) {
    if (!displayTranslation) {
      this.computeDisplayTranslation();
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
      Category.fromHttp(obj.category), obj.selectedLanguage,
      translations)
  }
}
