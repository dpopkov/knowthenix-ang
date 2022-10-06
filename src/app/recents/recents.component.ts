import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Question} from "../model/Question";
import {DataService} from "../data.service";
import {Router} from "@angular/router";
import {formatDate} from "@angular/common";
import {Reloader} from "../reloader";

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
  message = "Please wait... loading list of questions.";
  reloader: Reloader;

  constructor(private dataService: DataService,
              private router: Router,
              @Inject(LOCALE_ID) localId: string) {
    this.localID = localId;
    this.reloader = new Reloader((msg) => this.message = msg, () => this.loadQuestions());
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
      }, error => {
        this.reloader.tryToReloadOrLog(error);
      }
    )
  }
}
