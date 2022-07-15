export class Translation {

  constructor(public id?: number, public language?: string, public type?: string, public text?: string) {
  }

  isNew(): boolean {
    return this.id == null;
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
