import {Translation} from "./Translation";
import {Source} from "./Source";
import {KeyTerm} from "./KeyTerm";

export class Answer {
  source?: Source;

  // The keyterms used in local version only.
  keyterms: Array<KeyTerm>;

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

  copyTo(other: Answer) {
    other.id = this.id;
    other.questionId = this.questionId;
    other.sourceId = this.sourceId;
    if (!other.sourceId && this.source) {
      other.sourceId = this.source.id;
    }
    other.sourceName = this.sourceName;
    other.sourceDetails = this.sourceDetails;
    other.selectedLanguage = this.selectedLanguage;
    other.translations = this.translations;
    other.displayTranslation = this.displayTranslation;
  }

  static from(data: Answer): Answer {
    const translations = new Array<Translation>();
    for (const translationData of data.translations) {
      translations.push(Translation.fromHttp(translationData))
    }
    return new Answer(data.id, data.questionId, data.sourceId, data.sourceName,
      data.sourceDetails, data.selectedLanguage, translations);
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
