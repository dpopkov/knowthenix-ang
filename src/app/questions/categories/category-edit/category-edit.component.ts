import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { FormResetService } from 'src/app/form-reset.service';
import { Category } from 'src/app/model/Category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit, OnDestroy {

  @Input()
  category: Category;
  formCategory: Category;
  message: string;
  nameIsValid = false;
  resetEventSubscription: Subscription;

  constructor(private dataService: DataService,
              private formResetService: FormResetService,
              private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.resetEventSubscription = this.formResetService.resetCategoryFormEvent.subscribe(
      ct => {
        this.category = ct;
        this.initializeForm();
      }
    )
  }

  private initializeForm() {
    this.formCategory = Object.assign({}, this.category);
    this.checkIfNameIsValid();
  }

  onSubmit(): void {
    if (this.formCategory.id == null) {
      this.dataService.addCategory(this.formCategory).subscribe(
        (category) => {
          this.navigateToView(category);
        }
      )
    } else {
      this.dataService.updateCategory(this.formCategory).subscribe(
        (category) => {
          this.navigateToView(category);
        }
      )
    }
  }

  ngOnDestroy() {
    this.resetEventSubscription.unsubscribe();
  }

  private navigateToView(category: Category) {
    this.router.navigate(['questions', 'categories'], {queryParams: {id: category.id, action: 'view'}});
  }

  checkIfNameIsValid(): void {
    if (this.formCategory.name) {
      this.nameIsValid = this.formCategory.name.trim().length > 0;
    } else {
      this.nameIsValid = false;
    }
  }
}
