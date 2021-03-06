import { Component, OnInit } from '@angular/core';
import {Question} from "../../model/Question";
import {DataService} from "../../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questions: Array<Question>;
  selectedQuestion: Question;
  action: string;
  loadingData = true;
  message = 'Please wait... getting the list of Questions';
  reloadAttempts = 0;

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getQuestions().subscribe(
      (next) => {
        this.questions = next;
        this.loadingData = false;
      },
      (error) => {
        this.reloadAttempts++;
        if (this.reloadAttempts < 5) {
          this.message = 'Sorry - something went wrong, trying again... please wait';
          this.loadData();
        } else {
          this.message = 'Sorry - something went wrong, please contact support';
        }
      }
    )
  }

  displayViewQuestion(questionId: number): void {
    this.router.navigate(['questions', 'view'], {queryParams: {questionId: questionId}});
  }

  displayEditQuestion(questionId: number): void {
    this.router.navigate(['questions', 'edit'], {queryParams: {id: questionId}});
  }

  displayAddNewQuestion(): void {
    this.router.navigate(['questions', 'edit'], {queryParams: {action: 'add'}});
  }
}
