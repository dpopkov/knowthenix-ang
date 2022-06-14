import { Component, OnInit } from '@angular/core';
import {Source} from "../model/Source";
import {DataService} from "../data.service";

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.css']
})
export class SourcesComponent implements OnInit {

  sources: Array<Source>;
  loadingData = true;
  message = 'Please wait... getting the list of Sources';
  reloadAttempts = 0;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getSources().subscribe(
      next => {
        this.sources = next;
        this.loadingData = false;
      },
      error => {
        this.reloadAttempts++;
        if (this.reloadAttempts < 5) {
          this.message = 'Sorry - something went wrong, trying again... please wait';
          this.loadData();
        } else {
          this.message = 'Sorry - something went wrong, please contact support';
          console.log('Error loading sources:', error);
        }
      }
    )
  }

}
