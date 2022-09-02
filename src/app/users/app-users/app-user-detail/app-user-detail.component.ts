import {Component, Input, OnInit} from '@angular/core';
import {AppUser} from "../../../model/AppUser";

@Component({
  selector: 'app-app-user-detail',
  templateUrl: './app-user-detail.component.html',
  styleUrls: ['./app-user-detail.component.css']
})
export class AppUserDetailComponent implements OnInit {

  @Input()
  user: AppUser;

  constructor() { }

  ngOnInit(): void {
  }

}
