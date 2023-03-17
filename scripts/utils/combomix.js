import { recipes } from "../../data/recipes.js";
import { searchByTag } from "./searchtag.js";
import { recipesContainer, multipleChoice } from "./searchbar.js";

const btn = document.querySelectorAll(".combobox-btn");
const tags = document.getElementById("tag-result");
const btnIngredients = document.querySelector("#ingredients");
const btnAppareils = document.querySelector("#appareils");
const btnUstensiles = document.querySelector("#ustensiles");
const inputIngredients = document.querySelector("#ingredients .combobox-input");
const inputAppareils = document.querySelector("#appareils .combobox-input");
const inputUstensiles = document.querySelector("#ustensiles .combobox-input");

export const optionsIngredients = document.getElementById("choice-ingredients");
export const optionsAppareils = document.getElementById("choice-appareils");
export const optionsUstensiles = document.getElementById("choice-ustensiles");

const choiceIngredients = getIngredients(recipes);
const choiceAppareils = getAppareils(recipes);
const choiceUstensiles = getUstensiles(recipes);


btn[0].addEventListener("click", () => {
  btnIngredients.classList.toggle("active");
  btnAppareils.classList.remove("active");
  btnUstensiles.classList.remove("active");
  inputIngredients.focus();
  searchOptions(
    inputIngredients,
    btnIngredients,
    optionsIngredients,
    choiceIngredients
  );
});

btn[1].addEventListener("click", () => {
  btnAppareils.classList.toggle("active");
  btnIngredients.classList.remove("active");
  btnUstensiles.classList.remove("active");
  inputAppareils.focus();
  searchOptions(
    inputAppareils,
    btnAppareils,
    optionsAppareils,
    choiceAppareils
  );
});

btn[2].addEventListener("click", () => {
  btnUstensiles.classList.toggle("active");
  btnIngredients.classList.remove("active");
  btnAppareils.classList.remove("active");
  inputUstensiles.focus();
  searchOptions(
    inputUstensiles,
    btnUstensiles,
    optionsUstensiles,
    choiceUstensiles
  );
});

function only(value, index, self) {
  return self.indexOf(value) === index;
}

// Ingédients
export function getIngredients(recipes) {
  const list = [];
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((el) => list.push(el.ingredient));
  });
  const sortIngredients = list.filter(only);
  sortIngredients.sort((a, b) => a.localeCompare(b));
  return sortIngredients;
}

// Appareils
export function getAppareils(recipes) {
  const list = [];
  recipes.forEach((recipe) => {
    list.push(recipe.appliance);
  });
  const sortAppareils = list.filter(only);
  sortAppareils.sort((a, b) => a.localeCompare(b));
  return sortAppareils;
}

// Ustensiles
export function getUstensiles(recipes) {
  const list = [];
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((el) => list.push(el));
  });
  const sortUstensiles = list.filter(only);
  sortUstensiles.sort((a, b) => a.localeCompare(b));
  return sortUstensiles;
}

// AJ0UTER DES LISTES

function addList() {
  // Ingrédients
  optionsIngredients.innerHTML = "";
  choiceIngredients.forEach((el) => {
    const li = `<li data-value="${el}">${el}</li>`;
    optionsIngredients.insertAdjacentHTML("beforeend", li);
  });

  // Appareils
  optionsAppareils.innerHTML = "";
  choiceAppareils.forEach((el) => {
    const li = `<li data-value="${el}">${el}</li>`;
    optionsAppareils.insertAdjacentHTML("beforeend", li);
  });

  // Ustensiles
  optionsUstensiles.innerHTML = "";
  choiceUstensiles.forEach((el) => {
    const li = `<li data-value="${el}">${el}</li>`;
    optionsUstensiles.insertAdjacentHTML("beforeend", li);
  });
}

// RECHERCHER DANS LE INPUT DE CHAQUE COMBOBOX

function searchOptions(input, btn, options, choice) {
  input.addEventListener("keyup", () => {
    if (input.value.length > 0) {
      btn.classList.add("active");
      options.innerHTML = "";
      let valueInput = input.value[0].toUpperCase() + input.value.slice(1);
      let sortList = choice.filter(
        (option) =>
          option.includes(valueInput) ||
          option.includes(input.value.toLowerCase())
      );
      for (let option of sortList) {
        options.insertAdjacentHTML(
          "beforeend",
          `<li data-value="${option}">${option}</li>`
        );
      }
    } else {
      addList(choice);
    }
  });
}


// TAGS

function displayTag(e) {
  const elementParent = document.querySelector(`[data-value="${e}"]`);
  const span = document.createElement("span");

  span.classList.add("tag");
  span.textContent = e;
  span.insertAdjacentHTML(
    "beforeend",
    `<span class="close-tag" data-name="close"><img  src="../../assets/svg/cross.svg" alt="Btn close element"/></span>`
  );
  tags.appendChild(span);

  if (elementParent.parentNode.id === "choice-ingredients") {
    span.style.background = "#3282f7";
    span.setAttribute("data-category", "ingredient");

    inputIngredients.value = "";
    btnIngredients.classList.remove("active");
  } else if (elementParent.parentNode.id === "choice-appareils") {
    span.style.background = "#68d9a4";
    span.setAttribute("data-category", "appareils");

    inputAppareils.value = "";
    btnAppareils.classList.remove("active");
  } else if (elementParent.parentNode.id === "choice-ustensiles") {
    span.style.background = "#ed6454";
    span.setAttribute("data-category", "ustensiles");

    inputUstensiles.value = "";
    btnUstensiles.classList.remove("active");
  } else {
    console.log("Error");
  }

  closeTag();
}

function closeTag() {
  const closeTag = document.querySelectorAll(".close-tag");
  closeTag.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      e.target.parentNode.parentNode.remove();
      e.stopPropagation();
      NewList.delete(e.target.parentNode.parentElement.textContent);
      if (e.currentTarget.dataset.name == "close") {
        recipesContainer.innerHTML = "";
        multipleChoice(searchByTag(recipes));
      }
    });
  });
}

// NOUVELLE LISTE DE TAG

let NewList = new Set();

function valueTag(options) {
  options.addEventListener("click", (e) => {
    if (!NewList.has(e.target.dataset.value)) {
      tags.innerHTML = "";
      NewList.add(e.target.dataset.value);
    }
    for (let tag of NewList) {
      displayTag(tag);
    }
  });
}

addList();

valueTag(optionsIngredients);
valueTag(optionsAppareils);
valueTag(optionsUstensiles);