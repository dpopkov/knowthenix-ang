import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Question} from "../model/Question";
import {DataService} from "../data.service";
import {Router} from "@angular/router";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-recents',
  templateUrl: './recents.component.html',
  styleUrls: ['./recents.component.css']
})
export class RecentsComponent implements OnInit {

  public localID: string;
  selectedDate: string;
  questions: Array<Question>;
  dataLoaded = false;
  message: string;

  constructor(private dataService: DataService,
              private router: Router,
              @Inject(LOCALE_ID) localId: string) {
    this.localID = localId;
  }

  ngOnInit(): void {
    this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', this.localID);
    this.loadQuestions();
  }

  displayQuestion(questionId: number): void {
    this.router.navigate(['questions', 'view'], {queryParams: {questionId: questionId}});
  }

  dateChanged(): void {
    this.loadQuestions();
  }

  private loadQuestions() {
    this.dataService.getQuestionsByCreatedOn(this.selectedDate).subscribe(
      next => {
        this.questions = next;
        this.dataLoaded = true;
      }
    )
  }
}
