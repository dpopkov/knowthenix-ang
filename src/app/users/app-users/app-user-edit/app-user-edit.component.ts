import {Component, Input, OnInit} from '@angular/core';
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
  formUser: AppUser;
  message: string;

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.formUser = AppUser.fromHttp(this.user);
  }

  onSubmit(): void {
    this.dataService.updateAppUser(this.formUser).subscribe(
      user => {
        this.router.navigate(['users'],
          {queryParams: {id: user.id, action: 'view'}});
      }
    )
  }
}
