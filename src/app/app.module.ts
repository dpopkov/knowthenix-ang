import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './questions/categories/categories.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CategoryDetailComponent } from './questions/categories/category-detail/category-detail.component';
import { CategoryEditComponent } from './questions/categories/category-edit/category-edit.component';
import { FormsModule } from '@angular/forms';
import { KeytermsComponent } from './keyterms/keyterms.component';
import { KeyTermDetailComponent } from './keyterms/key-term-detail/key-term-detail.component';
import { KeyTermEditComponent } from './keyterms/key-term-edit/key-term-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    CategoriesComponent,
    CategoryDetailComponent,
    CategoryEditComponent,
    KeytermsComponent,
    KeyTermDetailComponent,
    KeyTermEditComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
