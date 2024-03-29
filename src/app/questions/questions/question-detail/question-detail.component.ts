import {Component, OnInit} from '@angular/core';
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
  showAnswers: boolean = false;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const idAsString = this.route.snapshot.queryParams['questionId'];
    this.showAnswers = this.route.snapshot.queryParams['showAnswers'];
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

  displayAnswers() {
    this.showAnswers = true;
  }

  hideAnswers() {
    this.showAnswers = false;
  }
}
