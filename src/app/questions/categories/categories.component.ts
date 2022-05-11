import { Component, OnInit } from '@angular/core';
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

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // this.categories = this.dataService.categories;

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
  }

  setSelectedCategory(id: number): void {
    this.selectedCategory = this.categories.find(category => category.id === id);
  }

}
