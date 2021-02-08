const searchFood  =     () =>{
  const searchText = document.getElementById("search-field").value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`

  // load data form api
fetch (url)
.then(res => res.json())
.then (data => displayFoods(data.meals)) 
.catch( error => window.alert( searchText+ "  is invalid" ))


const displayFoods = foods => {
  console.log(foods);
  const foodContainer = document.getElementById("food-container");
  foods.forEach(food => {
    console.log(food);
    const foodDiv = document.createElement("div");
    foodDiv.className.add = ' food-card-area ';
    foodDiv.innerHTML=`
                  <div   onclick="getDetails('${food.idMeal}')" class="card shadow rounded" >
                    <img src="${food.strMealThumb}" class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="text-center">${food.strMeal}</h5>
                    </div>
                  </div>        
       `
    foodContainer.appendChild(foodDiv)
  });
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
        <div class="modal-dialog  mb-5 bg-light">
            <div class="class="modal-content shadow rounded">
            <div class="modal-header border-0">
            <h5 class="modal-title">Food Details</h5>
          </div>
                <div class="modal-body p-4">
                <img src="${details.strMealThumb}" class="card-img-top">
                <div>
                    <h1 class="mb-4">${details.strMeal}</h1>
                    <h5 class="card-text mb-4">Ingredients</h5>
                    <div id="ingredients">
                   </div>
                   <p class=" mt-4 md-0 footer" >  &copy; by Fahan Ahmed Nahid. </p>
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