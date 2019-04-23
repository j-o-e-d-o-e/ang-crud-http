import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from './ingredient.model';
import {IngredientService} from './ingredient.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private ingredientService: IngredientService) {
  }

  ngOnInit() {
    this.subscription = this.ingredientService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => this.ingredients = ingredients
    );
    this.ingredients = this.ingredientService.getIngredients();
  }

  onEditIngredient(id: number) {
    this.ingredientService.startedEditing.next(id); // start editing here, continue in ingredient-edit
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
