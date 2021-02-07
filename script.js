const foodContainer = document.querySelector(".food-card-area");
const itemSearch = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


const mealItem = () => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${itemSearch.value}`)
    .then((res) => res.json())
    .then((food) => {
      foodList(food);
    });
};


const foodList = (foods) => {

  if (itemSearch.value.length <= 0 || foods.meals == null) {
    foodContainer.innerHTML = `
       <div>
         <h1> Sorry .  ${itemSearch.value} This food is not Available  our Restaurant. Please Order Another Food.  </h1>
        </div>
       `;
    foodContainer.classList.remove("food-card-area");
    foodContainer.classList.add("invalid-input");
  }
   else {
    const allMealList = foods.meals;
    const allFindItem = document.createElement("div");
   for(let i = 0; i < allMealList.length; i ++){
       const food = allMealList[i];
        const foodCard = document.createElement("div");
       foodContainer.classList.add("food-card-area");
       foodCard.innerHTML = `
        <div class="card" >
            <img src="${food.strMealThumb}" class="card-img-top item-images" alt="...">
            <div class="card-body">
                <h2 class="text-center"> ${food.strMeal}</h2>
            </div>
        </div>
        `;
        allFindItem.appendChild(foodCard);
    }
    foodContainer.innerHTML = allFindItem.innerHTML
    foodContainer.classList.add("food-card-area");
  }
};

searchButton.addEventListener("click", () => {
  mealItem();
});


