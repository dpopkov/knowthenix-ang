import { EventEmitter, Injectable } from '@angular/core';
import { KeyTerm } from './model/KeyTerm';
import { Category } from "./model/Category";

@Injectable({
  providedIn: 'root'
})
export class FormResetService {

  resetCategoryFormEvent = new EventEmitter<Category>();
  resetKeyTermFormEvent = new EventEmitter<KeyTerm>();

  constructor() { }
}
