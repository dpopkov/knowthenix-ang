import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/model/Category';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  @Input()
  category: Category;

  constructor() { }

  ngOnInit(): void {
  }

}
