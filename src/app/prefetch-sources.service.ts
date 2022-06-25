import { Injectable } from '@angular/core';
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {Source} from "./model/Source";
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class PrefetchSourcesService implements Resolve<Observable<Array<Source>>>{

  constructor(private dataService: DataService) { }

  resolve(): Observable<Array<Source>> {
    return this.dataService.getSources();
  }
}
