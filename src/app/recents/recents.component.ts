import { Component, OnInit } from '@angular/core';
import {Question} from "../model/Question";
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recents',
  templateUrl: './recents.component.html',
  styleUrls: ['./recents.component.css']
})
export class RecentsComponent implements OnInit {

  questions: Array<Question>;
  dataLoaded = false;
  message: string;

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.dataService.getQuestions().subscribe(
      next => {
        this.questions = next;
        this.dataLoaded = true;
      }
    )
  }

  displayQuestion(questionId: number): void {
    this.router.navigate(['questions', 'view'], {queryParams: {questionId: questionId}});
  }
}
