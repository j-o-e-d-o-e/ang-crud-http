import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../ingredient.model';
import {IngredientService} from '../ingredient.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.css']
})
export class IngredientEditComponent implements OnInit, OnDestroy {
  @ViewChild('form')
  form: NgForm;
  subscription: Subscription;
  editMode = false;
  editItem: Ingredient;

  constructor(private ingredientService: IngredientService) {
  }

  ngOnInit(): void {
    this.subscription = this.ingredientService.startedEditing.subscribe(
      (id: number) => {
        this.editMode = true;
        this.editItem = this.ingredientService.getIngredient(id);
        this.form.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
      }
    );
  }

  onSubmit() {
    const value = this.form.value;
    if (this.editMode) {
      this.editMode = false;
      this.ingredientService.updateIngredient(this.editItem.id, value.name, value.amount);
    } else {
      const ingredient = new Ingredient(value.name, value.amount);
      this.ingredientService.addIngredient(ingredient);
    }
    this.form.reset();
  }

  onDelete() {
    this.ingredientService.deleteIngredient(this.editItem.id);
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
