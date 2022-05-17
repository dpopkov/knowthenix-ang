import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Category } from 'src/app/model/Category';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  @Input()
  category: Category;
  @Output()
  dataChangedEvent = new EventEmitter();
  message = '';

  constructor(private router: Router,
            private dataService: DataService) { }

  ngOnInit(): void {
  }

  editCategory() {
    this.router.navigate(['questions', 'categories'], 
                        {queryParams: {id: this.category.id, action: 'edit'}});
  }

  deleteCategory(): void {
    const deleteConfirmed = confirm('Are you sure you wish do delete this Category?');
    if (deleteConfirmed) {
      this.message = "Deleting...";
      this.dataService.deleteCategory(this.category.id).subscribe(
        next => {
          this.dataChangedEvent.emit();
          this.router.navigate(['questions', 'categories']);
        }, error => {
          this.message = 'Sorry, this Category cannot be deleted at this time';
        }
      )
    }
  }
}
