import { Component, OnInit } from '@angular/core';
import {Answer} from "../../../model/Answer";
import {DataService} from "../../../data.service";
import {ActivatedRoute} from "@angular/router";
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

    console.log('this.formAnswer.sourceId=', this.formAnswer.sourceId);
    console.log('this.formAnswer.sourceName=', this.formAnswer.sourceName);
  }

  onSubmit() {
    console.log('onSubmit is NOT IMPLEMENTED YET');

    // todo: Null unnecessary for backend data
    // this.answer.source = null;
  }

  closeAnswerEdit() {
    console.log('closeAnswerEdit is NOT IMPLEMENTED YET');
  }

  navigateToAnswerTranslations() {
    console.log('navigateToAnswerTranslations is NOT IMPLEMENTED YET');
  }
}
