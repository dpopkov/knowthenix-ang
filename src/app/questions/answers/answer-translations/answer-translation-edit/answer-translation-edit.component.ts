import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Translation} from "../../../../model/Translation";
import {Language} from "../../../../model/Language";
import {DataService} from "../../../../data.service";
import {Router} from "@angular/router";
import {TrType} from "../../../../model/TrType";

@Component({
  selector: 'app-answer-translation-edit',
  templateUrl: './answer-translation-edit.component.html',
  styleUrls: ['./answer-translation-edit.component.css']
})
export class AnswerTranslationEditComponent implements OnInit {

  @Input()
  answerId: number;
  @Input()
  translation: Translation;
  @Input()
  isFirst = false;
  @Output()
  dataChangedEvent = new EventEmitter();
  @Output()
  firstIsSavedEvent = new EventEmitter();
  formTranslation: Translation;
  languages = Object.keys(Language);
  languageMap: Map<string, string>;
  types: Array<string>;

  constructor(private dataService: DataService,
              private router: Router) {
    this.languageMap = dataService.getLanguageMap();
    const typeKeys = Object.keys(TrType);
    this.types = typeKeys.slice(typeKeys.length / 2);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.formTranslation = Translation.fromOther(this.translation);
  }

  onSubmit(): void {
    if (this.formTranslation.isNew()) {
      if (this.isFirst) {
        this.formTranslation.copyTo(this.translation);
        this.firstIsSavedEvent.emit();
      } else {
        this.dataService.addAnswerTranslation(this.answerId, this.formTranslation).subscribe(
          next => {
            this.dataChangedEvent.emit();
            this.navigateToTranslationList();
          }
        )
      }
    } else {
      this.dataService.updateAnswerTranslation(this.answerId, this.formTranslation).subscribe(
        next => {
          this.dataChangedEvent.emit();
          this.navigateToTranslationList();
        }
      )
    }
  }

  closeTranslationEdit(): void {
    this.navigateToTranslationList();
  }

  private navigateToTranslationList(): void {
    this.router.navigate(['answers', 'edit', 'translations'],
      {queryParams: {answerId: this.answerId}} );
  }
}
