import { Component, OnInit } from '@angular/core';
import {AppUser} from "../../model/AppUser";
import {DataService} from "../../data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-app-users',
  templateUrl: './app-users.component.html',
  styleUrls: ['./app-users.component.css']
})
export class AppUsersComponent implements OnInit {

  users: Array<AppUser>;
  selectedUser: AppUser;
  action: string;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.dataService.getAppUsers().subscribe(
      next => {
        this.users = next;
      }
    )
    this.route.queryParams.subscribe(
      params => {
        this.action = params['action'];
        const idString = params['id'];
        if (idString) {
          const idNumber = +idString;
          this.selectedUser = this.users.find(u => u.id === idNumber);
        }
      }
    )
  }

  setSelectedUser(userId: number): void {
    this.router.navigate(['users'], {queryParams: {id: userId, action: 'view'}});
  }

}
