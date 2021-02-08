const searchFood  =     () =>{
  const searchText = document.getElementById("search-field").value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
  // load data
fetch (url)
.then(res => res.json())
.then (data => displayFoods(data.meals)) 


const displayFoods = foods => {
  console.log(foods);
  const foodContainer = document.getElementById("food-container");

  if (searchText <= 0 ){
    foodContainer.innerHTML = `
       <div>
         <h1> Sorry !!  ${searchText} This food is not Available  our Restaurant. Please Order Another Food.  </h1>
        </div>
       `
       foodContainer.classList.remove("food-card-area");
    foodContainer.classList.add("invalid-input");
  }
else{
  foods.forEach(food => {
    console.log(food);
    const foodDiv = document.createElement("div");
    foodDiv.className.add = ' food-card-area ';
    foodDiv.innerHTML=`
                  <div   onclick="getDetails('${food.idMeal}')" class="card">
                    <img src="${food.strMealThumb}" class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="text-center">${food.strMeal}</h5>
                    </div>
                  </div>
                
    `;
    foodContainer.appendChild(foodDiv)
  });
}
}
}

const getDetails = mealId => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(response => response.json())
      .then(data => displayMealsDetails(data.meals[0]));
}

//   Food  Details  Function
const displayMealsDetails = details => {
    const mealsDetails = document.getElementById('food-details-area');
    mealsDetails.innerHTML = `
        <div class="d-flex justify-content-center mb-5">
            <div class="card w-75 border-0 rounded-3 meal-details">
                <img src="${details.strMealThumb}" class="card-img-top">
                <div class="card-body bg-light">
                    <h1 class="mb-4">${details.strMeal}</h1>
                    <h5 class="card-text mb-4">Ingredients</h5>
                    <div id="ingredients">
                   </div>
                </div>
            </div>
        </div>
        `;
    const mealIngredients = document.getElementById('ingredients');
    

    for (let i = 1; i <= 10; i++) {
        if (details['strIngredient' + i]) {
            const ingredient = document.createElement('li');
            ingredient.innerText = `${details['strMeasure' + i]} ${details['strIngredient' + i]}`;
            mealIngredients.appendChild(ingredient);
        }
    }
}