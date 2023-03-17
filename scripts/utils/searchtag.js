import { recipes } from "../../data/recipes.js";
import { displayRecipe } from "../index.js";
import { multipleChoice, search, recipesContainer } from "./searchbar.js";

// Ingédients
function sortByIngredients(recipes) {
  const ul = document.getElementById("choice-ingredients");
  ul.addEventListener("click", (e) => {
    recipesContainer.innerHTML = "";
    const sortRecipe = recipes.filter((recipe) =>
      recipe.ingredients.some((el) =>
        el.ingredient.includes(e.target.dataset.value)
      )
    );

    multipleChoice(searchByTag(sortRecipe));
  });
}

// Appareils
function sortByAppareils(recipes) {
  const ul = document.getElementById("choice-appareils");
  ul.addEventListener("click", (e) => {
    recipesContainer.innerHTML = "";
    const sortRecipe = recipes.filter((element) =>
      element.appliance.includes(e.target.dataset.value)
    );

    multipleChoice(searchByTag(sortRecipe));
  });
}

// Ustensiles
function sortByUstensiles(recipes) {
  const ul = document.getElementById("choice-ustensiles");
  ul.addEventListener("click", (e) => {
    recipesContainer.innerHTML = "";
    const sortRecipe = recipes.filter((element) =>
      element.ustensils.includes(e.target.dataset.value)
    );

    multipleChoice(searchByTag(sortRecipe));
  });
}

sortByIngredients(recipes);
sortByAppareils(recipes);
sortByUstensiles(recipes);

export function searchByTag(sortRecipe) {
  let tags = document.querySelectorAll(".tag");
  let sortArray = sortRecipe;
  tags.forEach((tag) => (sortArray = search(tag.textContent, sortArray)));
  displayRecipe(sortArray);
  return sortArray;
}
