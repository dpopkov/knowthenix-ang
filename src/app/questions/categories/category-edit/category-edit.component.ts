import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Category } from 'src/app/model/Category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  @Input()
  category: Category;
  formCategory: Category;
  message: string;

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.formCategory = Object.assign({}, this.category);
  }

  onSubmit(): void {
    this.dataService.updateCategory(this.formCategory).subscribe(
      (category) => {
        this.router.navigate(['questions', 'categories'],
                            {queryParams: {id: category.id, action: 'view'}});
      }
    )
  }

}
