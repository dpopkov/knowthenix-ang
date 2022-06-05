export class Translation {
  id: number;
  language: string;
  type: string;
  text: string;

  constructor(id?: number, language?: string, type?: string, text?: string) {
    if (id) {
      this.id = id;
    }
    if (language) {
      this.language = language;
    }
    if (type) {
      this.type = type;
    }
    if (text) {
      this.text = text;
    }
  }

  copyTo(other: Translation): Translation {
    other.id = this.id;
    other.language = this.language;
    other.type = this.type;
    other.text = this.text;
    return other;
  }

  static fromOther(translation: Translation): Translation {
    return new Translation(translation.id, translation.language, translation.type, translation.text);
  }

  static fromHttp(obj: Translation): Translation {
    return new Translation(obj.id, obj.language, obj.type, obj.text);
  }
}
