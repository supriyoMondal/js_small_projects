const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    singleMealEl = document.getElementById('single-meal'),
    resultsHeading = document.getElementById('results-heading');

let meals = []

async function searchMeal(e) {
    e.preventDefault();
    //clear Single Meal
    singleMealEl.innerHTML = ``;

    const term = search.value;
    if (!term || !term.trim()) return;
    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
        res = await res.json();
        resultsHeading.innerHTML = `
        <h2>
        Search results for '${term}'
        </h2>`
        if (!res.meals) {
            resultsHeading.innerHTML = `There are no search results try again.`;
            return;
        }
        mealsEl.innerHTML = res.meals.map(meal => `
        <div class='meal'>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="meal-info" data-mealId="${meal.idMeal}">
            <h3>
            ${meal.strMeal}
            </h3>
            </div>
        </div>
        `).join('');

        search.value = ''
    } catch (error) {
        console.log(error.message);
    }


}

function addMealToDOM(meal) {
    const ingredients = [];
    for (let i = 0; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal['strIngredient' + i]} - ${meal['strMeasure' + i]}`)
        }
    }
    singleMealEl.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
        </div>
    `
}

//fetch meal by id
async function getMealBy(mealID) {
    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
        res = await res.json();
        const meal = res.meals[0];
        addMealToDOM(meal);
    } catch (error) {
        console.log('get meal');
    }
}

//Search Event Listener
submit.addEventListener('submit', searchMeal);

mealsEl.addEventListener('click', e => {
    if (!e.target.classList.contains('meal-info')) return;
    let mealId = e.target.getAttribute('data-mealId');
    getMealBy(mealId)
})
