import {Component} from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers: [RecipeService] // if recipeService would only be used in this module (and not in parent module)
})
export class RecipesComponent {
}
