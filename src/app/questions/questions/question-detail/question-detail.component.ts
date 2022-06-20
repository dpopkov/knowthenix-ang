import { Component, OnInit } from '@angular/core';
import {Question} from "../../../model/Question";
import {DataService} from "../../../data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

  question: Question;
  action: string;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const idAsString = this.route.snapshot.queryParams['questionId'];
    if (idAsString) {
      const idNumber = +idAsString;
      this.dataService.getQuestionById(idNumber)
        .subscribe(
          next => {
            this.question = next;
          }
        )
    }
  }

  displayEditQuestion(questionId: number): void {
    this.router.navigate(['questions', 'edit'], {queryParams: {id: questionId}});
  }

  backToQuestions(): void {
    this.navigateToQuestionList();
  }

  private navigateToQuestionList(): void{
    this.router.navigate(['questions', 'questions'])
  }

}
