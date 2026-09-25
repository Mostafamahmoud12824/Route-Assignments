var tabs = document.querySelectorAll(".tab");
var contents = document.querySelectorAll(".tab-content");

for (var i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function () {
    // Remove "active" from every tab
    for (var j = 0; j < tabs.length; j++) {
      tabs[j].classList.remove("active");
    }

    for (var k = 0; k < contents.length; k++) {
      contents[k].classList.remove("active");
    }

    this.classList.add("active");
    var target = document.getElementById(this.dataset.target);
    if (target) {
      target.classList.add("active");
    }
  });
}
var meals = [
  {
    mealName: "Quinoa Veggie Salad",
    description:
      "A light yet filling bowl of fluffy quinoa, crunchy vegetables and tangy feta, finished with a fresh lemon dressing.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80",
    rate: 4.8,
    reviews: 256,
    prepTime: "15 min",
    cookTime: "20 min",
    servings: "4 people",
    difficulty: "Easy",
    cuisine: "Mediterranean",
    isExtended: false,
    ingredients: [
      "1 cup quinoa",
      "1 cucumber",
      "1 red bell pepper",
      "1 cup cherry tomatoes",
      "100g feta cheese",
      "3 tablespoons olive oil",
      "Juice of 1 lemon",
      "Salt to taste",
    ],
    instructions: [
      "Cook the quinoa according to the package, then let it cool.",
      "Dice the cucumber, pepper and tomatoes into small pieces.",
      "Mix the quinoa with the vegetables and feta in a large bowl.",
      "Whisk olive oil, lemon juice and salt, then pour over the salad.",
    ],
    nutrition: { calories: "340kcal", protein: "12g", carbs: "41g", fat: "14g" },
    tips: [
      "Rinse the quinoa well to remove its bitter coating",
      "Let the quinoa cool completely so the veggies stay crunchy",
      "Add the dressing just before serving",
    ],
  },
  {
    mealName: "Pad Thai",
    description:
      "Stir-fried rice noodles with shrimp, egg and a sweet-sour tamarind sauce, topped with crushed peanuts and lime.",
    image:
      "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=1000&q=80",
    rate: 4.7,
    reviews: 312,
    prepTime: "20 min",
    cookTime: "15 min",
    servings: "2 people",
    difficulty: "Intermediate",
    cuisine: "Asian",
    isExtended: false,
    ingredients: [
      "200g rice noodles",
      "200g shrimp, peeled",
      "2 eggs",
      "3 tablespoons tamarind paste",
      "2 tablespoons fish sauce",
      "1 tablespoon palm sugar",
      "Bean sprouts",
      "Crushed peanuts",
      "Lime wedges and cilantro",
    ],
    instructions: [
      "Soak the rice noodles in warm water for 10 minutes, then drain.",
      "Mix tamarind paste, fish sauce and palm sugar to make the sauce.",
      "Stir-fry the shrimp until pink, then push aside and scramble the eggs.",
      "Add the noodles and sauce and toss until coated.",
      "Serve with bean sprouts, peanuts, lime and cilantro.",
    ],
    nutrition: { calories: "520kcal", protein: "28g", carbs: "65g", fat: "16g" },
    tips: [
      "Don't over-soak the noodles or they will turn mushy",
      "Use a very hot pan for a smoky flavor",
      "Taste the sauce and balance sweet, sour and salty",
    ],
  },
  {
    mealName: "French Onion Soup",
    description:
      "Deeply caramelized onions simmered in rich beef broth, topped with toasted bread and melted Gruyère.",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1000&q=80",
    rate: 4.9,
    reviews: 198,
    prepTime: "15 min",
    cookTime: "60 min",
    servings: "4 people",
    difficulty: "Intermediate",
    cuisine: "French",
    isExtended: true,
    ingredients: [
      "4 large onions, thinly sliced",
      "3 tablespoons butter",
      "1 liter beef broth",
      "1/2 cup dry white wine",
      "2 sprigs thyme",
      "4 slices baguette",
      "150g Gruyère cheese, grated",
    ],
    instructions: [
      "Melt the butter and cook the onions on low heat for 40 minutes until golden.",
      "Add the wine and let it reduce for 2 minutes.",
      "Pour in the broth and thyme and simmer for 20 minutes.",
      "Ladle into bowls, top with bread and cheese.",
      "Broil until the cheese is bubbly and golden.",
    ],
    nutrition: { calories: "410kcal", protein: "18g", carbs: "35g", fat: "22g" },
    tips: [
      "Patience is key - don't rush the onion caramelization",
      "Use good quality beef broth for best flavor",
      "Gruyère can be substituted with Swiss cheese",
      "Watch carefully when broiling to avoid burning",
    ],
  },
  {
    mealName: "Chicken Tikka Masala",
    description:
      "Tender marinated chicken pieces in a creamy, spiced tomato sauce. Perfect with rice or naan.",
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1000&q=80",
    rate: 4.8,
    reviews: 421,
    prepTime: "30 min",
    cookTime: "40 min",
    servings: "4 people",
    difficulty: "Intermediate",
    cuisine: "Indian",
    isExtended: true,
    ingredients: [
      "600g chicken breast, cubed",
      "1 cup plain yogurt",
      "2 tablespoons garam masala",
      "1 onion, chopped",
      "3 garlic cloves, minced",
      "400g crushed tomatoes",
      "1 cup heavy cream",
      "Fresh coriander",
    ],
    instructions: [
      "Marinate the chicken in yogurt and half the garam masala for 30 minutes.",
      "Grill or pan-sear the chicken until charred.",
      "Cook the onion and garlic, then add the rest of the spices.",
      "Add the tomatoes and simmer for 15 minutes.",
      "Stir in the cream and chicken and simmer for 10 more minutes.",
    ],
    nutrition: { calories: "560kcal", protein: "42g", carbs: "18g", fat: "34g" },
    tips: [
      "Marinate overnight for even more flavor",
      "Char the chicken well for a smoky taste",
      "Finish with a squeeze of lemon",
    ],
  },
  {
    mealName: "Classic Margherita Pizza",
    description:
      "A thin, crispy crust topped with tomato sauce, fresh mozzarella and basil leaves.",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=80",
    rate: 4.6,
    reviews: 289,
    prepTime: "20 min",
    cookTime: "12 min",
    servings: "2 people",
    difficulty: "Easy",
    cuisine: "Italian",
    isExtended: false,
    ingredients: [
      "1 pizza dough ball",
      "1/2 cup tomato sauce",
      "150g fresh mozzarella",
      "Fresh basil leaves",
      "1 tablespoon olive oil",
      "Pinch of salt",
    ],
    instructions: [
      "Preheat the oven to its highest setting.",
      "Stretch the dough into a thin round.",
      "Spread the sauce and add torn mozzarella.",
      "Bake for 10-12 minutes until the crust is golden.",
      "Top with basil and a drizzle of olive oil.",
    ],
    nutrition: { calories: "650kcal", protein: "26g", carbs: "80g", fat: "24g" },
    tips: [
      "Preheat the baking tray or stone for a crispy base",
      "Don't overload the pizza with sauce",
      "Add basil after baking so it stays fresh",
    ],
  },
];

var randomRecipe = document.getElementById("randomRecipe");
var mealImageElement = document.getElementById("mealImage");
var rate = document.getElementById("rate");
var prepTimeElement = document.getElementById("prepTime");
var cookTimeElement = document.getElementById("cookTime");
var servesElement = document.getElementById("serves");
var mealDifficultyElement = document.getElementById("mealDifficulty");
var cuisineElement = document.getElementById("cuisine");
var mealNameElement = document.getElementById("mealName");
var mealDescriptionElement = document.getElementById("mealDescription");
var warningElement = document.getElementById("warning");
var ingredientsList = document.getElementById("ingredientsList");
var instructionsList = document.getElementById("instructionsList");
var nutritionList = document.getElementById("nutritionList");
var tipsList = document.getElementById("tipsList");

var index = 0;
// display meal

function displayMeal() {
  mealImageElement.src = meals[index].image;
  mealImageElement.alt = meals[index].mealName;
  rate.innerHTML = `${meals[index].rate} (${meals[index].reviews} reviews)`;
  prepTimeElement.innerHTML = meals[index].prepTime;
  cookTimeElement.innerHTML = meals[index].cookTime;
  servesElement.innerHTML = meals[index].servings;
  mealDifficultyElement.innerHTML = meals[index].difficulty;
  cuisineElement.innerHTML = meals[index].cuisine;
  mealNameElement.innerHTML = meals[index].mealName;
  mealDescriptionElement.innerHTML = meals[index].description;

  if (meals[index].isExtended) {
    warningElement.classList.replace("d-none", "d-flex");
  } else {
    warningElement.classList.replace("d-flex", "d-none");
  }
  displayIngredients();
  displayInstructions();
  displayNutrition();
  displayTips();
}

function displayIngredients() {
  var box = ``;
  for (let i = 0; i < meals[index].ingredients.length; i++) {
    box += `<li class="ingredient">
              <span class="ingredient-number">${i + 1}</span> ${meals[index].ingredients[i]}
            </li>`;
  }
  ingredientsList.innerHTML = box;
}

function displayInstructions() {
  var box = ``;
  for (let i = 0; i < meals[index].instructions.length; i++) {
    box += `<li class="item">
              <span class="number">${i + 1}</span> ${meals[index].instructions[i]}
            </li>`;
  }
  instructionsList.innerHTML = box;
}

function displayNutrition() {
  var nutrition = meals[index].nutrition;
  nutritionList.innerHTML = `
    <div class="nutrition-box">
      <i class="fa-solid fa-fire" style="color: rgb(240, 121, 11);font-size: 24px;"></i>
      <p class="nutrition-label">Calories</p>
      <p class="nutrition-value">${nutrition.calories}</p>
    </div>
    <div class="nutrition-box">
      <i class="fa-solid fa-dumbbell" style="color: rgb(20, 111, 183);font-size: 24px;"></i>
      <p class="nutrition-label">Protein</p>
      <p class="nutrition-value">${nutrition.protein}</p>
    </div>
    <div class="nutrition-box">
      <i class="fa-solid fa-carrot" style="color: rgb(233, 218, 10);font-size: 24px;"></i>
      <p class="nutrition-label">Carbs</p>
      <p class="nutrition-value">${nutrition.carbs}</p>
    </div>
    <div class="nutrition-box">
      <i class="fa-solid fa-droplet" style="color: rgb(206, 18, 18);font-size: 24px;"></i>
      <p class="nutrition-label">Fat</p>
      <p class="nutrition-value">${nutrition.fat}</p>
    </div>`;
}

function displayTips() {
  var box = ``;
  for (let i = 0; i < meals[index].tips.length; i++) {
    box += `<div class="bg-light rounded-3 p-3 border-start border-4 border-warning shadow-sm d-flex align-items-center gap-3">
              <div class="rounded-circle bg-warning text-white d-flex align-items-center justify-content-center"
                style="width: 20px; height: 20px; font-size: 12px">
                <i class="fa-solid fa-check"></i>
              </div>
              <span class="text-muted small">${meals[index].tips[i]}</span>
            </div>`;
  }
  tipsList.innerHTML = box;
}
function getrandomindex() {
  var temp;
  do {
  temp = Math.floor(Math.random() * meals.length);
  }while (temp == index) 
  index = temp;
  displayMeal();
  
}
getrandomindex();
randomRecipe.onclick = getrandomindex;