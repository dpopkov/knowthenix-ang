import {Component, Input, OnInit} from '@angular/core';
import {Translation} from "../../../model/Translation";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../../data.service";

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.css']
})
export class TranslationsComponent implements OnInit {

  translations: Array<Translation>
  questionId: number;
  action: string;
  selectedTranslation: Translation;
  dataLoaded = false;
  message: string;
  @Input()
  fromEdit = true;

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.processUrlParams();
  }

  private processUrlParams() {
    this.route.queryParams.subscribe(
      params => {
        const questionIdStr = params['questionId'];
        if (questionIdStr) {
          this.questionId = +questionIdStr;
          if (!this.dataLoaded) {
            this.loadTranslations();
          }
          this.action = params['action'];
          const translationIdStr = params['translationId'];
          if (translationIdStr) {
            const translationId = +translationIdStr;
            this.selectedTranslation = this.translations.find(t => t.id === translationId);
          }
        }
      }
    )
  }

  loadTranslations(): void {
    this.dataLoaded = false;
    this.dataService.getTranslationsByQuestionId(this.questionId).subscribe(
      next => {
        this.translations = next;
        this.dataLoaded = true;
      },
      error => {
        console.log('TranslationsComponent:loadTranslation error=', error);
        this.message = 'Something went wrong and the translations were not loaded.';
      }
    );
  }

  navigateToEditTranslation(translationId: number): void {
    this.router.navigate(['questions', 'edit', 'translations'],
      {queryParams: {questionId: this.questionId, translationId: translationId, action: 'edit'}} );
  }

  navigateToQuestion(): void {
    this.router.navigate(['questions', 'edit'], {queryParams: {id: this.questionId}} );
  }

  addTranslation() {
    this.selectedTranslation = new Translation();
    this.router.navigate(['questions', 'edit', 'translations'],
      {queryParams: {questionId: this.questionId, action: 'add'}} );
  }
}
