import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppUser} from "../../../model/AppUser";
import {Router} from "@angular/router";
import {DataService} from "../../../data.service";

@Component({
  selector: 'app-app-user-detail',
  templateUrl: './app-user-detail.component.html',
  styleUrls: ['./app-user-detail.component.css']
})
export class AppUserDetailComponent implements OnInit {

  @Input()
  user: AppUser;
  @Output()
  userDeletedEvent = new EventEmitter();
  message: string;

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
  }

  editUser() {
    this.router.navigate(['users'],
      {queryParams: {id: this.user.id, action: 'edit'}});
  }

  deleteUser() {
    const deleteConfirmed = confirm('Are you sure you wish do delete this User?');
    if (deleteConfirmed) {
      this.message = 'Deleting...';
      this.dataService.deleteAppUser(this.user.id).subscribe(
        next => {
          this.userDeletedEvent.emit();
          this.router.navigate(['users']);
        }, error => {
          this.message = 'Sorry - this user cannot be deleted at this time.';
          console.log('Error deleting user:', error);
        }
      )
    }
  }

  resetUserPassword() {
    this.dataService.resetUserPassword(this.user.id).subscribe();
  }
}
