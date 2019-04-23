import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {IngredientService} from '../ingredients/ingredient.service';
import {Ingredient} from '../ingredients/ingredient.model';

@Injectable()
export class DataStorageService {
  private url = 'URL';

  constructor(private http: HttpClient, private recipeService: RecipeService, private ingredientService: IngredientService) {
  }

  saveData() {
    this.http.put(this.url + 'ingredients.json', this.ingredientService.getIngredients()).subscribe();
    return this.http.put(this.url + 'recipes.json', this.recipeService.getRecipes());
  }

  fetchData() {
    this.http.get<Ingredient[]>(this.url + 'ingredients.json')
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredientService.setIngredients(ingredients);
        Ingredient.count = Math.max.apply(Math, ingredients.map(i => {
          return i.id;
        })) + 1;
      });

    this.http.get<Recipe[]>(this.url + 'recipes.json', {
        observe: 'body', responseType: 'json', // default options (can be omitted)
      }
    ).pipe(map((recipes) => {
        for (const recipe of recipes) {
          if (!recipe.ingredients) {
            recipe.ingredients = [];
          }
        }
        return recipes;
      }
    )).subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
        Recipe.count = Math.max.apply(Math, recipes.map(r => {
          return r.id;
        })) + 1;
      }
    );
  }

}
