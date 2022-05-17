import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { FormResetService } from 'src/app/form-reset.service';
import { Category } from 'src/app/model/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Array<Category>;
  selectedCategory: Category;
  action: string;
  loadingData = true;
  message = 'Please wait... getting the list of Categories';
  reloadAttempts = 0;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private formResetService: FormResetService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getCategories().subscribe(
      (next) => {
        this.categories = next;
        this.loadingData = false;
        this.processUrlParams();
      },
      (error) => {
        this.reloadAttempts++;
        if (this.reloadAttempts < 5) {
          this.message = 'Sorry - something went wrong, trying again... please wait';
          this.loadData();
        } else {
          this.message = 'Sorry - something went wrong, please contact support';
        }
      }
    )
  }

  private processUrlParams(): void {
    this.route.queryParams.subscribe(
      (params) => {
        const idAsString = params['id'];
        if (idAsString) {
          const idAsNumber = +idAsString;
          this.selectedCategory = this.categories.find(category => category.id === idAsNumber);
        }
        this.action = params['action'];
      }
    )
  }

  setSelectedCategory(categoryId: number): void {
    this.router.navigate(['questions', 'categories'], {queryParams : { id : categoryId, action : 'view'}});
  }

  addCategory(): void {
    this.selectedCategory = new Category();
    this.formResetService.resetCategoryFormEvent.emit(this.selectedCategory);
    this.router.navigate(['questions', 'categories'], {queryParams: {action: 'add'}});
  }

}
