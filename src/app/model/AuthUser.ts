export class AuthUser {
  public publicId: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public joinDate: Date;
  public lastLoginDateDisplay: Date;
  public lastLoginDate: Date;
  public role: string;
  public authorities: string[];
  public profileImageUrl: string;
  public active: boolean;
  public notLocked: boolean;

  constructor() {
    this.publicId = '';
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.email = '';
    this.joinDate = null;
    this.lastLoginDateDisplay = null;
    this.lastLoginDate = null;
    this.role = '';
    this.authorities = [];
    this.profileImageUrl = '';
    this.active = false;
    this.notLocked = false;
  }
}
