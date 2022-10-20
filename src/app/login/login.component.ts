import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;
  name: string;
  password: string;

  constructor(private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.authService.authenticate(this.name, this.password)) {
      const url = this.activatedRoute.snapshot.queryParams['requested'];
      this.router.navigateByUrl(url);
    } else {
      this.message = 'Your username or password was not recognised.';
    }
  }
}
