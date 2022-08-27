import { Component, OnInit } from '@angular/core';
import {Source} from "../model/Source";
import {DataService} from "../data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormResetService} from "../form-reset.service";

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.css']
})
export class SourcesComponent implements OnInit {

  sources: Array<Source>;
  selectedSource: Source;
  action: string;
  loadingData = true;
  message = 'Please wait... getting the list of Sources';
  reloadAttempts = 0;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private formResetService: FormResetService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getSources().subscribe(
      next => {
        this.sources = next;
        this.loadingData = false;
        this.processUrlParams();
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

  private processUrlParams(): void {
    this.route.queryParams.subscribe(
      params => {
        const idAsString = params['id'];
        if (idAsString) {
          const idAsNumber = +idAsString;
          this.selectedSource = this.sources.find(s => s.id === idAsNumber);
        }
        this.action = params['action'];
      }
    )
  }

  setSelectedSource(sourceId: number): void {
    this.router.navigate(['sources'], {queryParams: {id: sourceId, action: 'view'}});
  }

  addSource() {
    this.selectedSource = new Source();
    this.formResetService.resetSourceFormEvent.emit(this.selectedSource);
    this.router.navigate(['sources'], {queryParams: {action: 'add'}});
  }
}
