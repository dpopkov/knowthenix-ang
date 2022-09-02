export class AppUser {
  constructor(public id?: number, public name?: string) {
  }

  get isNew(): boolean {
    return this.id == null;
  }

  get isNotNew(): boolean {
    return this.id != null;
  }

  static fromHttp(appUser: AppUser): AppUser {
    return new AppUser(appUser.id, appUser.name);
  }
}
