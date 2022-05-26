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
}
