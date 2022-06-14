export class Source {

  constructor(public id?: number, public name?: string,
              public fullTitle?: string, public url?: string,
              public sourceType?: string, public description?: string) {
  }

  copyTo(other: Source): void {
    other.name = this.name;
    other.fullTitle = this.fullTitle;
    other.url = this.url;
    other.sourceType = this.sourceType;
    other.description = this.description;
  }

  static fromHttp(obj: Source): Source {
    return new Source(obj.id, obj.name, obj.fullTitle, obj.url, obj.sourceType, obj.description);
  }
}
