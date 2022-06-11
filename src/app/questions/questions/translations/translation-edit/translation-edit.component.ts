import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Translation} from "../../../../model/Translation";
import {Language} from "../../../../model/Language";
import {DataService} from "../../../../data.service";
import {TrType} from "../../../../model/TrType";
import {Router} from "@angular/router";

@Component({
  selector: 'app-translation-edit',
  templateUrl: './translation-edit.component.html',
  styleUrls: ['./translation-edit.component.css']
})
export class TranslationEditComponent implements OnInit {

  @Input()
  questionId: number;
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
    if (this.formTranslation.id == null) {
      if (this.isFirst) {
        this.formTranslation.copyTo(this.translation);
        this.firstIsSavedEvent.emit();
      } else {
        this.dataService.addTranslation(this.questionId, this.formTranslation).subscribe(
          next => {
            this.dataChangedEvent.emit();
            this.navigateToTranslationList();
          }
        )
      }
    } else {
      this.dataService.updateTranslation(this.questionId, this.formTranslation).subscribe(
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
    this.router.navigate(['questions', 'edit', 'translations'],
      {queryParams: {questionId: this.questionId}});
  }
}
