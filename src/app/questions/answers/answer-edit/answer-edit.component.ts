import { Component, OnInit } from '@angular/core';
import {Answer} from "../../../model/Answer";
import {DataService} from "../../../data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Source} from "../../../model/Source";
import {map} from "rxjs";
import {Language} from "../../../model/Language";
import {Translation} from "../../../model/Translation";

@Component({
  selector: 'app-answer-edit',
  templateUrl: './answer-edit.component.html',
  styleUrls: ['./answer-edit.component.css']
})
export class AnswerEditComponent implements OnInit {

  answer: Answer;
  formAnswer: Answer;
  firstTranslation: Translation;
  firstTranslationFilled = false;
  action: string;
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
    this.action = this.route.snapshot.queryParams['action'];
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
    } else if (this.action === 'add') {
      const questionIdAsStr = this.route.snapshot.queryParams['questionId'];
      if (questionIdAsStr) {
        this.formAnswer = new Answer();
        this.formAnswer.questionId = +questionIdAsStr;
        this.dataLoaded = true;
        this.message = '';
        this.firstTranslation = new Translation();
        this.formAnswer.translations.push(this.firstTranslation);
      } else {
        console.log('AnswerEditComponent - Missing parameter: questionId');
      }
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
      this.dataService.addNewAnswer(this.formAnswer).subscribe(
        next => {
          this.navigateToQuestionWithAnswerList(this.formAnswer.questionId);
        },
        error => {
          this.message = 'Something went wrong and the Answer was not created.';
          console.log('Error creating Answer:', error);
        }
      )
    } else {
      this.dataService.updateAnswer(this.formAnswer).subscribe(
        next => {
          this.navigateToQuestionWithAnswerList(this.formAnswer.questionId);
        },
        error => {
          this.message = 'Something went wrong and the Answer was not updated.';
          console.log('Error updating Answer:', error);
        }
      );
    }
  }

  closeAnswerEdit() {
    this.navigateToQuestionWithAnswerList(this.formAnswer.questionId);
  }

  navigateToAnswerTranslations() {
    this.router.navigate(['answers', 'edit', 'translations'],
      {queryParams: {answerId: this.answer.id}})
  }

  private navigateToQuestionWithAnswerList(questionId: number) {
    this.router.navigate(['questions', 'view'],
      {queryParams: {questionId: questionId, showAnswers: 'true'}})
  }

  hideFirstTranslationForm(): void {
    console.log('this.formAnswer', this.formAnswer);
    this.formAnswer.displayTranslation = this.formAnswer.translations[0];
    this.firstTranslationFilled = true;
  }
}
