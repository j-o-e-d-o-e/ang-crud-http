/* tslint:disable:object-literal-key-quotes no-string-literal */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';
import {Ingredient} from '../../ingredients/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editMode = false;
  editItem: Recipe;
  form: FormGroup;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = +params.id;
      this.editMode = (id != null && !isNaN(id));
      if (this.editMode) {
        this.editItem = this.recipeService.getRecipe(id);
      }
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      recipeName = this.editItem.name;
      recipeImagePath = this.editItem.imagePath;
      recipeDescription = this.editItem.description;
      if (this.editItem['ingredients']) {
        // tslint:disable-next-line:prefer-const
        for (let ingredient of this.editItem.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.form = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  getControls() {
    return (this.form.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    (this.form.get('ingredients') as FormArray).push(new FormGroup(
      {
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (this.form.get('ingredients') as FormArray).removeAt(index);
  }

  onSubmit() {
    const name = this.form.get('name').value;
    const description = this.form.value['description'];
    const imagePath = this.form.get('imagePath').value;
    const ingredients = this.form.get('ingredients').value;
    for (const ingredient of ingredients) {
      if (ingredient.id === undefined) {
        ingredient.id = Ingredient.count++;
      }
    }
    if (this.editMode) {
      this.recipeService.updateRecipe(this.editItem.id, name, description, imagePath, ingredients);
    } else {
      const recipe = new Recipe(name, description, imagePath, ingredients);
      this.recipeService.addRecipe(recipe);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
