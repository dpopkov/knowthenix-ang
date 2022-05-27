import {Component, Input, OnInit} from '@angular/core';
import {Translation} from "../../../model/Translation";

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.css']
})
export class TranslationsComponent implements OnInit {

  @Input()
  translations: Array<Translation>

  constructor() { }

  ngOnInit(): void {
  }

  displayEditTranslation(translationId: number): void {
    console.log('TranslationsComponent:displayEditTranslation: NOT IMPLEMENTED YET');
  }

  addTranslation() {
    console.log('TranslationsComponent:addTranslation: NOT IMPLEMENTED YET');
  }
}
