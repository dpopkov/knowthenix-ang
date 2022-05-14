import { EventEmitter, Injectable } from '@angular/core';
import { KeyTerm } from './model/KeyTerm';

@Injectable({
  providedIn: 'root'
})
export class FormResetService {

  resetKeyTermFormEvent = new EventEmitter<KeyTerm>();

  constructor() { }
}
