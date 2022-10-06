import { Component, OnInit } from '@angular/core';
import {Question} from "../../model/Question";
import {DataService} from "../../data.service";
import {Router} from "@angular/router";
import {Reloader} from "../../reloader";

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
  reloader: Reloader;

  constructor(private dataService: DataService,
              private router: Router) {
    this.reloader = new Reloader((msg) => this.message = msg, () => this.loadData());
  }

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
        this.reloader.tryToReloadOrLog(error);
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
