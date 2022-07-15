import {Component, Input, OnInit} from '@angular/core';
import {Answer} from "../../model/Answer";
import {DataService} from "../../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  @Input()
  questionId: number;
  answers: Array<Answer>;
  loadingData = false;
  message = 'Please wait... getting the list of Answers';
  reloadAttempts = 0;

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loadingData = true;
    this.dataService.getAnswersForQuestion(this.questionId).subscribe(
      next => {
        this.answers = next;
        this.loadingData = false;
      },
      error => {
        this.reloadAttempts++;
        if (this.reloadAttempts < 5) {
          this.message = 'Sorry - something went wrong, trying again... please wait';
          this.loadData();
        } else {
          this.message = 'Sorry - something went wrong, please contact support';
          console.log('Error loading answers:', error);
        }
      }
    )
  }

  addAnswerForQuestion(questionId: number): void {
    // todo:
    console.log('addAnswerForQuestion IS NOT IMPLEMENTED YET!!!');
  }

  editAnswer(answerId: number): void {
    this.router.navigate(['answers', 'edit'], {queryParams: {answerId}});
  }
}
