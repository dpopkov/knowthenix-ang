import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppUser} from "../../../model/AppUser";
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-app-user-edit',
  templateUrl: './app-user-edit.component.html',
  styleUrls: ['./app-user-edit.component.css']
})
export class AppUserEditComponent implements OnInit {

  @Input()
  user: AppUser;
  @Output()
  userChangeEvent = new EventEmitter();
  formUser: AppUser;
  message: string;
  password: string;
  passwordDouble: string;
  nameIsValid = false;
  passwordIsValid = false;
  passwordsMatch = false;

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.formUser = AppUser.fromHttp(this.user);
    this.checkIfNameIsValid();
    this.checkIfPasswordIsValid();
    this.checkIfPasswordsMatch();
  }

  onSubmit(): void {
    this.message = 'Saving...';
    if (this.formUser.isNew) {
      this.dataService.addAppUser(this.formUser, this.password).subscribe(
        user => {
          this.userChangeEvent.emit();
          this.navigateToView(user);
        }, error => {
          this.message = 'Something went wrong, you may wish to try again.';
          console.log('Error adding user:', error);
        }
      )
    } else {
      this.dataService.updateAppUser(this.formUser).subscribe(
        user => {
          this.userChangeEvent.emit();
          this.navigateToView(user);
        }, error => {
          this.message = 'Something went wrong, you may wish to try again.';
          console.log('Error updating user:', error);
        }
      )
    }
  }

  private navigateToView(user: AppUser): void {
    this.router.navigate(['users'],
      {queryParams: {id: user.id, action: 'view'}});
  }

  checkIfNameIsValid(): void {
    if (this.formUser.name) {
      this.nameIsValid = this.formUser.name.trim().length > 0;
    } else {
      this.nameIsValid = false;
    }
  }

  checkIfPasswordIsValid(): void {
    if (this.user.isNotNew) {
      this.passwordIsValid = true;
    } else if (this.password) {
      this.passwordIsValid = this.password.trim().length >= 8;
    } else {
      this.passwordIsValid = false;
    }
  }

  checkIfPasswordsMatch(): void {
    if (this.user.isNotNew) {
      this.passwordsMatch = true;
    } else if (this.password && this.passwordDouble) {
      this.passwordsMatch = this.password === this.passwordDouble;
    } else {
      this.passwordsMatch = false;
    }
  }
}
