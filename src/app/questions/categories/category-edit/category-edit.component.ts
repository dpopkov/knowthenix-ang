import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/model/Category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  @Input()
  category: Category;

  constructor() { }

  ngOnInit(): void {
  }

}
