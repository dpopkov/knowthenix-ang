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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeytermsComponent } from './keyterms/keyterms.component';
import { KeyTermDetailComponent } from './keyterms/key-term-detail/key-term-detail.component';
import { KeyTermEditComponent } from './keyterms/key-term-edit/key-term-edit.component';
import { QuestionsComponent } from './questions/questions/questions.component';
import { QuestionEditComponent } from './questions/questions/question-edit/question-edit.component';
import { TranslationsComponent } from './questions/questions/translations/translations.component';

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
    QuestionsComponent,
    QuestionEditComponent,
    TranslationsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
