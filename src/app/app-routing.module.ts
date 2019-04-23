import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {IngredientListComponent} from './ingredients/ingredient-list.component';
import {HomeComponent} from './core/home/home.component';
import {AuthGuard} from './auth/auth-guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'}, // #lazy loading
  {path: 'ingredients', component: IngredientListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
