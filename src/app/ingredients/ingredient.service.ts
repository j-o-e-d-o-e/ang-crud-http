import {Ingredient} from './ingredient.model';
import {Subject} from 'rxjs';

export class IngredientService {
  private ingredients: Ingredient[] = [];
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  getIngredients() {
    return this.ingredients;
  }

  getIngredient(id: number) {
    return this.ingredients.find(ingredient => {
      return ingredient.id === id;
    });
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients); // spread operator ... turns array into list of elements for pushing
    this.ingredientsChanged.next(this.getIngredients());
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.getIngredients());
  }

  updateIngredient(id, name: string, amount: number) {
    const ingredient = this.getIngredient(id);
    ingredient.name = name;
    ingredient.amount = amount;
    this.ingredientsChanged.next(this.getIngredients());
  }

  deleteIngredient(id: number) {
    const index = this.ingredients.indexOf(this.getIngredient(id));
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.getIngredients());
  }

  setIngredients(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
  }
}
