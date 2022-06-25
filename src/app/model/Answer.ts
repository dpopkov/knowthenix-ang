import {Translation} from "./Translation";
import {Source} from "./Source";

export class Answer {
  source?: Source;

  constructor(public id?: number,
              public questionId?: number,
              public sourceId?: number,
              public sourceName?: string,
              public sourceDetails?: string,
              public selectedLanguage?: string,
              public translations: Array<Translation> = new Array<Translation>(),
              public displayTranslation?: Translation) {
    if (!displayTranslation) {
      this.computeDisplayTranslation();
    }
  }

  get isNew(): boolean {
    return this.id == null;
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

  chooseSourceByIdFrom(sources: Array<Source>) {
    this.source = sources.find(s => s.id === this.sourceId);
  }

  static from(data: Answer): Answer {
    const translations = new Array<Translation>();
    for (const translationData of data.translations) {
      translations.push(Translation.fromHttp(translationData))
    }
    return new Answer(data.id, data.questionId, data.sourceId, data.sourceName,
      data.sourceDetails, data.selectedLanguage, translations);
  }
}
