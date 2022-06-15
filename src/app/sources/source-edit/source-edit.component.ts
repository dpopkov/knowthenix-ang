import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Source} from "../../model/Source";
import {SourceType} from "../../model/SourceType";
import {Router} from "@angular/router";
import {DataService} from "../../data.service";

@Component({
  selector: 'app-source-edit',
  templateUrl: './source-edit.component.html',
  styleUrls: ['./source-edit.component.css']
})
export class SourceEditComponent implements OnInit {

  @Input()
  source: Source;
  @Output()
  dataChangedEvent = new EventEmitter();
  formSource: Source;
  message: string;
  sourceTypes: Array<string>;

  constructor(private dataService: DataService,
              private router: Router) {
    this.sourceTypes = SourceEditComponent.getSourceTypeLabels();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.formSource = Source.from(this.source);
  }

  onSubmit(): void {
    this.message = "Saving...";
    if (this.formSource.isNew()) {
      this.dataService.addNewSource(this.formSource).subscribe(
        source => {
          this.dataChangedEvent.emit();
          this.navigateToSourceDetails(source.id);
        },
        error => {
          this.message = 'Something went wrong and the Source was not created.';
          console.log('Error updating source:', error);
        }
      )
    } else {
      this.dataService.updateSource(this.formSource).subscribe(
        source => {
          this.dataChangedEvent.emit();
          this.navigateToSourceDetails(source.id);
        },
        error => {
          this.message = 'Something went wrong and the Source was not updated.';
          console.log('Error updating source:', error);
        }
      )
    }
  }

  closeSourceEdit(): void {
    if (this.source.isNew()) {
      this.router.navigate(['sources']);
    } else {
      this.navigateToSourceDetails(this.source.id);
    }
  }

  private navigateToSourceDetails(sourceId: number) {
    this.router.navigate(['sources'], {queryParams: {id: sourceId, action: 'view'}});
  }

  private static getSourceTypeLabels(): Array<string> {
    const sourceTypesAll = Object.keys(SourceType);
    return sourceTypesAll.slice(sourceTypesAll.length / 2);
  }
}
