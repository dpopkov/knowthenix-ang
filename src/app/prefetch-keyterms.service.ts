import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {KeyTerm} from "./model/KeyTerm";

@Injectable({
  providedIn: 'root'
})
export class PrefetchKeytermsService implements Resolve<Observable<Array<KeyTerm>>>{

  constructor(private dataService: DataService) { }

  resolve(): Observable<Array<KeyTerm>> {
    return this.dataService.getKeyTerms();
  }
}
