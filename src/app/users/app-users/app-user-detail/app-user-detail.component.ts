import {Component, Input, OnInit} from '@angular/core';
import {AppUser} from "../../../model/AppUser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-app-user-detail',
  templateUrl: './app-user-detail.component.html',
  styleUrls: ['./app-user-detail.component.css']
})
export class AppUserDetailComponent implements OnInit {

  @Input()
  user: AppUser;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  editUser() {
    this.router.navigate(['users'],
      {queryParams: {id: this.user.id, action: 'edit'}});
  }
}
