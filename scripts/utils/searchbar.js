import { recipes } from "../../data/recipes.js";
import { searchByTag } from "./searchtag.js";
import {
  getIngredients,
  getAppareils,
  getUstensiles,
  optionsIngredients,
  optionsAppareils,
  optionsUstensiles,
} from "./combomix.js";

const searchInput = document.getElementById("search-input");
export const recipesContainer = document.getElementById("recipes-container");
const errorResult = document.getElementById("error-result");

// ALGO DE RECHERCHE & EVENEMENT

export function search(stringValue, newArray) {
  let sortArray = [];
  for (let i = 0; i < newArray.length; i++) {
    if (
      newArray[i].name.toLowerCase().includes(stringValue.toLowerCase()) ||
      newArray[i].description.toLowerCase().includes(stringValue.toLowerCase())
    ) {
      sortArray.push(newArray[i]);
    } else {
      for (let j = 0; j < newArray[i].ingredients.length; j++) {
        if (
          newArray[i].ingredients[j].ingredient
            .toLowerCase()
            .includes(stringValue.toLowerCase())
        ) {
          sortArray.push(newArray[i]);
        }
      }
    }
  }
  return sortArray;
}


export function searchRecipe() {
  searchInput.addEventListener("keyup", () => {
    if (searchInput.value.length >= 3) {
      recipesContainer.innerHTML = "";
      const stringValue = searchInput.value.toLowerCase();
      let sortArray = search(stringValue, recipes);
      if (sortArray == 0) {
        errorResult.innerHTML = `<p class="no-value">Aucune recettes, ingrédients, ou descriptions ne correspondent avec ce vous cherchez. Essayez : Limonade, Coco, Oignon... </p>`;
      } else {
        errorResult.innerHTML = "";
        multipleChoice(searchByTag(sortArray));
      }
    }
  });
}

searchInput.addEventListener("change", searchRecipe());

// TRI DE LA LISTE

export function multipleChoice(recipes) {
  const sortIngredients = getIngredients(recipes);
  optionsIngredients.innerHTML = "";
  sortIngredients.forEach((choice) => {
    const li = `<li data-value="${choice}">${choice}</li>`;
    optionsIngredients.insertAdjacentHTML("beforeend", li);
  });

  const sortAppareils = getAppareils(recipes);
  optionsAppareils.innerHTML = "";
  sortAppareils.forEach((choice) => {
    const li = `<li data-value="${choice}">${choice}</li>`;
    optionsAppareils.insertAdjacentHTML("beforeend", li);
  });

  const sortUstensiles = getUstensiles(recipes);
  optionsUstensiles.innerHTML = "";
  sortUstensiles.forEach((choice) => {
    const li = `<li data-value="${choice}">${choice}</li>`;
    optionsUstensiles.insertAdjacentHTML("beforeend", li);
  });
}
