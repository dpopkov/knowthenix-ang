import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/Category';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  @Input()
  category: Category;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  editCategory() {
    this.router.navigate(['questions', 'categories'], 
                        {queryParams: {id: this.category.id, action: 'edit'}});
  }
}
