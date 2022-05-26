import {Category} from "./Category";
import {Translation} from "./Translation";

export class Question {
  id: number;
  category: Category;
  selectedLanguage: String;
  translations: Array<Translation>;
  displayTranslation: Translation;

  constructor(id?: number,
              category?: Category,
              selectedLanguage?: String,
              translations?: Array<Translation>,
              displayTranslation?: Translation) {
    if (id) {
      this.id = id;
    }
    if (category) {
      this.category = category;
    }
    if (selectedLanguage) {
      this.selectedLanguage = selectedLanguage;
    }
    if (translations) {
      this.translations = translations;
    } else {
      this.translations = new Array<Translation>();
    }
    if (displayTranslation) {
      this.displayTranslation = displayTranslation;
    } else {
      this.computeDisplayTranslation();
    }
  }

  computeDisplayTranslation(): void {
    if (this.selectedLanguage && this.translations) {
      this.displayTranslation = this.translations.find(tr => tr.language === this.selectedLanguage);
    }
  }

  static fromHttp(obj: Question): Question {
    const translations = new Array<Translation>();
    for (const translationData of obj.translations) {
      translations.push(Translation.fromHttp(translationData))
    }
    return new Question(obj.id,
      Category.fromHttp(obj.category), obj.selectedLanguage,
      translations, obj.displayTranslation)
  }
}
