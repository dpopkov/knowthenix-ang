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

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.categories = this.dataService.categories;
  }

}
