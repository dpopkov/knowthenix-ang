import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { FormResetService } from 'src/app/form-reset.service';
import { KeyTerm } from 'src/app/model/KeyTerm';
import {AuthService} from "../../auth.service";
import {UiComponent} from "../../ui-component";

@Component({
  selector: 'app-key-term-edit',
  templateUrl: './key-term-edit.component.html',
  styleUrls: ['./key-term-edit.component.css']
})
export class KeyTermEditComponent extends UiComponent implements OnInit, OnDestroy {

  @Input()
  keyTerm: KeyTerm;
  @Output()
  dataChangedEvent = new EventEmitter();
  keyTermForm: FormGroup;
  resetEventSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
            private dataService: DataService,
            private router: Router,
            private authService: AuthService,
            private formResetService: FormResetService) {
    super();
  }

  ngOnInit(): void {
    this.setRole(this.authService.getRole());
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

    if (this.keyTerm.id == null) {
      this.dataService.addKeyTerm(this.keyTerm).subscribe(
        next => {
          this.dataChangedEvent.emit();
          this.navigateToView(next);
        }
      )
    } else {
      this.dataService.updateKeyTerm(this.keyTerm).subscribe(
        next => {
          this.dataChangedEvent.emit();
          this.navigateToView(next);
        }
      )
    }
  }

  closeKeyTermEdit(): void {
    this.navigateToView(this.keyTerm);
  }

  private navigateToView(kt: KeyTerm): void {
    this.router.navigate(['keyterms'], {queryParams: {action: 'view', id: kt.id}});
  }

}
