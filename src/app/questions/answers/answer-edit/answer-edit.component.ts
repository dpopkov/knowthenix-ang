import { Component, OnInit } from '@angular/core';
import {Answer} from "../../../model/Answer";
import {DataService} from "../../../data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Source} from "../../../model/Source";
import {map} from "rxjs";
import {Language} from "../../../model/Language";

@Component({
  selector: 'app-answer-edit',
  templateUrl: './answer-edit.component.html',
  styleUrls: ['./answer-edit.component.css']
})
export class AnswerEditComponent implements OnInit {

  answer: Answer;
  formAnswer: Answer;
  languages = Object.keys(Language);
  languageMap: Map<string, string>;
  sources: Array<Source>;
  dataLoaded = false;
  message = 'Please wait...';

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) {
    this.languageMap = dataService.getLanguageMap();
  }

  ngOnInit(): void {
    this.sources = this.route.snapshot.data['preloaded_sources'];
    const idAsString = this.route.snapshot.queryParams['answerId'];
    if (idAsString) { // edit existing Answer
      const id = +idAsString;
      this.dataService.getAnswerById(id)
        .pipe(
          map(answer => {
            answer.chooseSourceByIdFrom(this.sources);
            return answer;
          })
        )
        .subscribe(
        next => {
          this.answer = next;
          this.dataLoaded = true;
          this.message = '';
          this.initializeForm();
        }
      )
    } else {
      // adding new Answer
      console.log('AnswerEditComponent:ngOnInit - Adding new Answer is not implemented YET');
    }
  }

  private initializeForm() {
    this.formAnswer = Answer.from(this.answer);
    this.formAnswer.chooseSourceByIdFrom(this.sources);
  }

  onSourceChange() {
    this.formAnswer.sourceId = this.formAnswer.source.id;
    this.formAnswer.sourceName = this.formAnswer.source.name;
  }

  onSubmit() {
    this.formAnswer.computeDisplayTranslation();
    this.formAnswer.source = null; // it is unnecessary for backend
    if (this.formAnswer.isNew) {
      // todo: create new Answer
    } else {
      this.dataService.updateAnswer(this.formAnswer).subscribe(
        next => {
          this.navigateToQuestionWithAnswerList();
        },
        error => {
          this.message = 'Something went wrong and the Answer was not updated.';
          console.log('Error updating Answer:', error);
        }
      );
    }
  }

  closeAnswerEdit() {
    this.navigateToQuestionWithAnswerList();
  }

  navigateToAnswerTranslations() {
    console.log('navigateToAnswerTranslations is NOT IMPLEMENTED YET');
  }

  private navigateToQuestionWithAnswerList() {
    this.router.navigate(['questions', 'view'],
      {queryParams: {questionId: this.answer.questionId, showAnswers: 'true'}})
  }
}
