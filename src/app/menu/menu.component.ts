import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormResetService} from "../form-reset.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router,
              private formResetService: FormResetService) { }

  ngOnInit(): void {
  }

  navigateToHome(): void {
    this.router.navigate(['']);
  }

  navigateToQuestionsCategories(): void {
    this.router.navigate(['questions', 'categories']);
  }

  navigateToViewAllQuestions(): void {
    this.router.navigate(['questions', 'questions']);
  }

  navigateToAddNewQuestion(): void {
    this.formResetService.resetQuestionFormEvent.emit();
    this.router.navigate(['questions', 'edit'], {queryParams: {action: 'add'}});
  }

  navigateToKeyTerms(): void {
    this.router.navigate(['keyterms']);
  }

  navigateToSources(): void {
    this.router.navigate(['sources']);
  }

  navigateToUsers() {
    this.router.navigate(['users']);
  }
}
