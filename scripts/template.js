export function factoryRecipe(recipe) {
  const { name, ingredients, time, description } = recipe;

  const recipesContainer = document.getElementById("recipes-container");

  // Article
  const article = document.createElement("article");
  article.className = "card-recipe";

  // Block Image
  const image = document.createElement("img");
  image.className = "img-recipe";
  image.src = "../../assets/menu.jpg";

  // Block Info
  const info = document.createElement("div");
  info.className = "info-recipe";

  // Header info
  const headerCard = document.createElement("div");
  headerCard.className = "card-header";
  headerCard.classList.add("flex");

  // Title
  const title = document.createElement("h2");
  title.className = "title-recipe";
  title.textContent = name;

  // Timer
  const blockTimer = document.createElement("div");
  blockTimer.className = "card-timer";
  blockTimer.classList.add("flex");

  const timer = document.createElement("div");
  timer.className = "timer-recipe";
  timer.textContent = time + " min";

  const timerIcon = document.createElement("img");
  timerIcon.src = "../../assets/svg/clock.svg";

  // Info recette
  const contentCard = document.createElement("div");
  contentCard.className = "content-card";
  contentCard.classList.add("flex");

  // Liste d'ingredients
  const list = document.createElement("ul");
  list.className = "list-ingredients";

  ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.textContent = `${ingredient.ingredient}`;

    if (ingredient.quantity !== undefined) {
      const quantity = document.createElement("span");
      quantity.textContent = ` : ${ingredient.quantity}`;

      if (ingredient.unit !== undefined) {
        quantity.textContent = ` : ${ingredient.quantity} ${ingredient.unit}`;

        if (ingredient.unit === "grammes") {
          ingredient.unit = "g";
          quantity.textContent = ` : ${ingredient.quantity} ${ingredient.unit}`;
        }

        if (ingredient.unit === "litres") {
          ingredient.unit = "L";
          quantity.textContent = ` : ${ingredient.quantity} ${ingredient.unit}`;
        }

        if (ingredient.unit === "cuillères à soupe") {
          ingredient.unit = "cuillère(s)";
          quantity.textContent = ` : ${ingredient.quantity} ${ingredient.unit}`;
        }

        if (ingredient.unit === "cuillères à café") {
          ingredient.unit = "c. à café";
          quantity.textContent = ` : ${ingredient.quantity} ${ingredient.unit}`;
        }
      }

      li.appendChild(quantity);
    }

    list.appendChild(li);
  });

  // Description
  const descriptionRecipe = document.createElement("p");
  descriptionRecipe.className = "description-recipe";
  descriptionRecipe.textContent = description;

  recipesContainer.appendChild(article);
  article.appendChild(image);
  article.appendChild(info);

  // Block Info
  info.appendChild(headerCard);
  info.appendChild(contentCard);

  // Header Info
  headerCard.appendChild(title);

  // Timer info
  headerCard.appendChild(blockTimer);
  blockTimer.appendChild(timerIcon);
  blockTimer.appendChild(timer);

  // Block Content
  contentCard.appendChild(list);
  contentCard.appendChild(descriptionRecipe);
}
