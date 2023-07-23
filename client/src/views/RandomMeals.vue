<template>
 <div>
    <div v-for="meal in random" :key="meal.idMeal" class="meal-container">
      <div style="margin-left: 30px;" class="meal-image">
        <img :src="meal.strMealThumb" :alt="meal.strMeal">
        <a style="margin-left: 50px; margin-top: 50px;" :href="meal.strSource" target="_blank" class="myButton">View Recipe</a>
      </div>
      <div style="margin-left: 20px;" class="meal-details">
        <h5><strong> Name:</strong> {{ meal.strMeal }}</h5>
        <p> <strong> Category:</strong> {{ meal.strCategory }}</p>
        <p><strong> Area:</strong> {{ meal.strArea }}</p>
     <h6> <strong>Ingredients:</strong></h6>
        <ul>
          <li v-for="(ingredient, index) in getIngredients(meal)" :key="index">
            {{ ingredient }}
          </li>
        </ul>
        <h6> <strong>Instructions:</strong></h6>
        <p>{{ meal.strInstructions }}</p>
       
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useRecipeStore } from '../stores/counter';

export default {
  name: 'RandomMeals',
  created() {
    this.randomMeals();
  },
  computed: {
    ...mapState(useRecipeStore, ['random']),
  },
  methods: {
    ...mapActions(useRecipeStore, ['randomMeals']),
    getIngredients(meal) {
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal['strIngredient' + i];
        const measure = meal['strMeasure' + i];
        if (ingredient && measure && ingredient.trim() !== '') {
          ingredients.push(`${measure} ${ingredient}`);
        }
      }
      return ingredients;
    }
  },
  
}
</script>

<style>
.meal-container {
  display: flex;
  margin-bottom: 20px;
}

.meal-image {
  flex: 1;
  max-width: 300px;
  margin-right: 20px;
}

.meal-image img {
  width: 100%;
  height: auto;
}

.meal-details {
  flex: 2;
}
.card {
  width: 500px;
  margin: 20px auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
}

.card-img-top {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-text {
  margin-bottom: 10px;
}

.card-subtitle {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
}

.btn-primary {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
