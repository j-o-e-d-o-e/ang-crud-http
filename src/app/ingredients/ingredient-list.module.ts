import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IngredientListComponent} from './ingredient-list.component';
import {IngredientEditComponent} from './ingredient-edit/ingredient-edit.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    IngredientListComponent,
    IngredientEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class IngredientListModule {
}
