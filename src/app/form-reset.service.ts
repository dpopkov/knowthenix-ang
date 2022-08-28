import { EventEmitter, Injectable } from '@angular/core';
import { KeyTerm } from './model/KeyTerm';
import { Category } from "./model/Category";
import {Source} from "./model/Source";

@Injectable({
  providedIn: 'root'
})
export class FormResetService {

  resetCategoryFormEvent = new EventEmitter<Category>();
  resetKeyTermFormEvent = new EventEmitter<KeyTerm>();
  resetSourceFormEvent = new EventEmitter<Source>();
  resetQuestionFormEvent = new EventEmitter();

  constructor() { }
}
