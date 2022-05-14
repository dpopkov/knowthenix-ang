import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { FormResetService } from 'src/app/form-reset.service';
import { KeyTerm } from 'src/app/model/KeyTerm';

@Component({
  selector: 'app-key-term-edit',
  templateUrl: './key-term-edit.component.html',
  styleUrls: ['./key-term-edit.component.css']
})
export class KeyTermEditComponent implements OnInit, OnDestroy {

  @Input()
  keyTerm: KeyTerm;
  keyTermForm: FormGroup;
  resetEventSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
            private dataService: DataService,
            private router: Router,
            private formResetService: FormResetService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.resetEventSubscription = this.formResetService.resetKeyTermFormEvent.subscribe(
      (keyTerm) => {
        this.keyTerm = keyTerm;
        this.initializeForm();
      }
    )
  }

  private initializeForm() {
    this.keyTermForm = this.formBuilder.group(
      {
        keyTermName: [this.keyTerm.name, [Validators.required, Validators.minLength(2)]],
        keyTermDescription: this.keyTerm.description
      }
    );
  }

  ngOnDestroy(): void {
    this.resetEventSubscription.unsubscribe();
  }

  onSubmit() {
    this.keyTerm.name = this.keyTermForm.controls['keyTermName'].value;
    this.keyTerm.description = this.keyTermForm.controls['keyTermDescription'].value;
    console.log('updated keyterm', this.keyTerm);

    if (this.keyTerm.id == null) {
      this.dataService.addKeyTerm(this.keyTerm).subscribe(
        next => {
          this.navigateToFiew(next);
        }
      )
    } else {
      this.dataService.updateKeyTerm(this.keyTerm).subscribe(
        next => {
          this.navigateToFiew(next);
        }
      )
    }
  }

  private navigateToFiew(kt: KeyTerm): void {
    this.router.navigate(['keyterms'], {queryParams: {action: 'view', id: kt.id}});
  }

}
