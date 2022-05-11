import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Category } from 'src/app/model/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Array<Category>;
  selectedCategory: Category;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    // Prepare for REST
    /*
    this.dataService.getCategory(2).subscribe(
      category => {
        console.log('in categories.component.ts ngOnInit: category.name=', category.name);
      }
    )
    */
    this.dataService.getCategories().subscribe(
      (next) => {
        this.categories = next;
      }
    )
    this.route.queryParams.subscribe(
      (params) => {
        const idAsString = params['id'];
        if (idAsString) {
          const idAsNumber = +idAsString;
          this.selectedCategory = this.categories.find(category => category.id === idAsNumber);
        }
      }
    )
  }

  setSelectedCategory(categoryId: number): void {
    this.router.navigate(['questions', 'categories'], {queryParams : { id : categoryId}});
  }

}
