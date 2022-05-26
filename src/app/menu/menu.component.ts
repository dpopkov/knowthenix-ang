import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

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

  navigateToKeyTerms(): void {
    this.router.navigate(['keyterms']);
  }
}
