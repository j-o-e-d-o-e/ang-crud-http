import {Recipe} from './recipe.model';
import {Ingredient} from '../ingredients/ingredient.model';
import {Subject} from 'rxjs';

export class RecipeService {
  private recipes: Recipe[];
  recipesChanged = new Subject<Recipe[]>();

  getRecipes() {
    return this.recipes;
  }

  getRecipe(id: number) {
    return this.recipes.find(recipe => recipe.id === id);
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
    console.log('ADD', this.recipes);
  }

  updateRecipe(id: number, name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
    const recipe = this.getRecipe(id);
    recipe.name = name;
    recipe.description = description;
    recipe.imagePath = imagePath;
    recipe.ingredients = ingredients;
    this.recipesChanged.next(this.getRecipes());
    console.log('UPDATE', this.recipes);
  }

  deleteRecipe(id: number) {
    const index = this.recipes.indexOf(this.getRecipe(id));
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.getRecipes());
  }
}
