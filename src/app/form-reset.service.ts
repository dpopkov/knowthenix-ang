import { EventEmitter, Injectable } from '@angular/core';
import { KeyTerm } from './model/KeyTerm';

@Injectable({
  providedIn: 'root'
})
export class FormResetService {

  resetCategoryFormEvent = new EventEmitter<KeyTerm>();
  resetKeyTermFormEvent = new EventEmitter<KeyTerm>();

  constructor() { }
}
