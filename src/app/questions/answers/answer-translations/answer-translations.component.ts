import {Component, Input, OnInit} from '@angular/core';
import {Translation} from "../../../model/Translation";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../../data.service";

@Component({
  selector: 'app-answer-translations',
  templateUrl: './answer-translations.component.html',
  styleUrls: ['./answer-translations.component.css']
})
export class AnswerTranslationsComponent implements OnInit {

  translations: Array<Translation>;
  answerId: number;
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

  private processUrlParams(): void {
    this.route.queryParams.subscribe(
      params => {
        const answerIdStr = params['answerId'];
        if (answerIdStr) {
          this.answerId = +answerIdStr;
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
    this.dataService.getTranslationsByAnswerId(this.answerId).subscribe(
      next => {
        this.translations = next;
        this.dataLoaded = true;
      },
      error => {
        console.log('AnswerTranslationsComponent:loadTranslation error=', error);
        this.message = 'Something went wrong and the translations were not loaded.';
      }
    )
  }

  addTranslation() {
    this.selectedTranslation = new Translation();
    this.router.navigate(['answers', 'edit', 'translations'],
      {queryParams: {answerId: this.answerId, action: 'add'}} );
  }

  navigateToEditTranslation(translationId: number): void {
    this.router.navigate(['answers', 'edit', 'translations'],
      {queryParams: {answerId: this.answerId, translationId: translationId, action: 'edit'}} );
  }

  navigateToAnswer(): void {
    this.router.navigate(['answers', 'edit'], {queryParams: {answerId: this.answerId}} );
  }
}
