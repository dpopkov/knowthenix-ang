import { Component, OnInit } from '@angular/core';
import {AppUser} from "../../model/AppUser";
import {DataService} from "../../data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Reloader} from "../../reloader";

@Component({
  selector: 'app-app-users',
  templateUrl: './app-users.component.html',
  styleUrls: ['./app-users.component.css']
})
export class AppUsersComponent implements OnInit {

  users: Array<AppUser>;
  selectedUser: AppUser;
  action: string;
  loadingData = true;
  message = 'Please wait... getting the list of Users';
  reloader: Reloader;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) {
    this.reloader = new Reloader((msg) => this.message = msg, () => this.loadUsers());
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.dataService.getAppUsers().subscribe(
      next => {
        this.users = next;
        this.loadingData = false;
        this.processUrlParams();
      },
      error => {
        this.reloader.tryToReloadOrLog(error);
      }
    )
  }

  private processUrlParams() {
    this.route.queryParams.subscribe(
      params => {
        this.action = params['action'];
        if (this.action === 'add') {
          this.selectedUser = new AppUser();
        } else if (this.action === 'edit' || this.action === 'view') {
          const idString = params['id'];
          if (idString) {
            const idNumber = +idString;
            this.selectedUser = this.users.find(u => u.id === idNumber);
          }
        }
      }
    )
  }

  setSelectedUser(userId: number): void {
    this.router.navigate(['users'], {queryParams: {id: userId, action: 'view'}});
  }

  addUser(): void {
    this.router.navigate(['users'], {queryParams: {action: 'add'}});
  }
}
