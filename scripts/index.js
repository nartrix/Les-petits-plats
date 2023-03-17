import { recipes } from "../../data/recipes.js";
import { factoryRecipe } from "../scripts/template.js";

export function displayRecipe(recipes) {
  recipes.forEach((recipe) => factoryRecipe(recipe));
  console.log(recipes);
}

function init() {
  displayRecipe(recipes);
}

init();
