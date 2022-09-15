import {Component, Input, OnInit} from '@angular/core';
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

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
  }

  editUser() {
    this.router.navigate(['users'],
      {queryParams: {id: this.user.id, action: 'edit'}});
  }

  deleteUser() {
    this.dataService.deleteAppUser(this.user.id).subscribe(
      next => {
        this.router.navigate(['users']);
      }
    )
  }

  resetUserPassword() {
    this.dataService.resetUserPassword(this.user.id).subscribe();
  }
}
