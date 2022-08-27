import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Source} from "../../model/Source";
import {SourceType} from "../../model/SourceType";
import {Router} from "@angular/router";
import {DataService} from "../../data.service";
import {FormResetService} from "../../form-reset.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-source-edit',
  templateUrl: './source-edit.component.html',
  styleUrls: ['./source-edit.component.css']
})
export class SourceEditComponent implements OnInit, OnDestroy {

  @Input()
  source: Source;
  @Output()
  dataChangedEvent = new EventEmitter();
  formSource: Source;
  message: string;
  sourceTypes: Array<string>;
  resetEventSubscription: Subscription;

  constructor(private dataService: DataService,
              private formResetService: FormResetService,
              private router: Router) {
    this.sourceTypes = SourceEditComponent.getSourceTypeLabels();
  }

  ngOnInit(): void {
    this.initializeForm();
    this.resetEventSubscription = this.formResetService.resetSourceFormEvent.subscribe(
      source => {
        this.source = source;
        this.initializeForm();
      }
    )
  }

  ngOnDestroy(): void {
    this.resetEventSubscription.unsubscribe();
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
