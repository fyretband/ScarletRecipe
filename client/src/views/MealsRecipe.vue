<script>
import { mapActions, mapState } from 'pinia';
import { useRecipeStore } from '../stores/counter';

export default {
  name: 'MealsRecipe',
  data() {
    return {

    }
  },
  created() {
    const name = this.$route.params.name

  },
  computed: {
    ...mapState(useRecipeStore, ['meals'])
  },
  methods: {
    ...mapActions(useRecipeStore, ['mealsRecipe']),
    handleMealsRecipe() {
      const name = this.$route.params.name
      this.mealsRecipe(name)
    },
    openInNewTab(url) {
      window.open(url, '_blank', 'noreferrer');
    }
 
    
  }
}
  
</script>

<template>
  <div class="container">

<div class="row mt-4">
  <div v-for="meal in meals" class="col-md">
    <div class="row">
      <div class="centereddiv text-center col-md-6">
        <h5 class="text-center recipesubName">Category: {{ meal.strCategory}}</h5>
        <h2 class="text-center recipeName">{{ meal.strMeal }}</h2>
        <h5 class="text-center">Origin: {{ meal.strArea}}</h5>
        <button style="margin-top: 20px;" role="link" @click="openInNewTab(meal.strYoutube)" class="videobtn">Watch Video</button>
      </div>
      <div class="centered-img col-md-6">
        <img :src="meal.strMealThumb" class="responsive-img img-fluid" alt="Nama Makanan">
      </div>
      </div>
      <div class="mydiv row">
      <div class=" col-md-4">
        <h3 class="mt-4">Ingredients:</h3><hr>
        <ul v-for="index in 20" >
          <li v-if="meal['strIngredient' + index] !== '' && meal['strIngredient' + index] !== null">
            {{ meal['strMeasure' + index] }} {{ meal['strIngredient' + index] }}
          </li>
        </ul>
      </div>
      <div class=" col-md-8">
        <h3 class="mt-4">How to Cook:</h3><hr>
        <pre >{{ meal.strInstructions }}</pre>
      </div>
    </div>
 
  </div>
</div>
</div>
   <!-- <div>
  <div v-for="meal in meals" :key="meal.idMeal" class="meal-container">
    <div style="margin-left: 30px;" class="meal-image">
      <img :src="meal.strMealThumb" :alt="meal.strMeal" class="meal-img">
      <div class="button-container">
        <a :href="meal.strYoutube" class="myButton">Watch Video</a>
      </div>
    </div>
    <div style="margin-left: 20px;" class="meal-details">
      <h5><strong>Name: {{ meal.strMeal }}</strong></h5>
      <p><strong>From:</strong> {{ meal.strArea }}</p>
      <p><strong>Tags:</strong> {{ meal.strTags }}</p>
      <h6>Ingredients:</h6>
      <ul>
        <li v-for="(ingredient, index) in getIngredients(meal)" :key="index">
          {{ ingredient }}
        </li>
      </ul>
      <h6>How to Cook:</h6>
      <pre>{{ meal.strInstructions }}</pre>
    </div>
  </div>
</div> -->
</template>
<style>
hr{
  border: none;
  height: 1px;
  /* Set the hr color */
  color: #333;  /* old IE */
  background-color: #333;  /* Modern Browsers */
}
pre{
   display: block;
   font-family: monospace;
   white-space: pre;
   margin: 1em 0;
   background-color: transparent;
   border-color: transparent;
   
}
.recipesubName{
  padding-top: auto;
}
.recipeName{
  font-weight: bold;
}

.centereddiv{
  display: block;
  text-align: center;
  padding-top: 20%;
  padding: 10%;
  margin: 0;
}

.centered-img{
  text-align: center;

}

.videobtn{
  font-size: medium;
  color: black;
  border-radius: 0px;
    padding: 0px 1rem;
    min-width: 50px;
    height: 3rem;
    min-height: 0px;
    transition-property: color, background, border;
    transition-duration: 200ms;
    transition-timing-function: ease-in;
    color: black;
    background-color: lightgray;
    border-color: rgb(51, 51, 51);
    margin: 10px;
}

.responsive-img{
  width: 500px;
  height: 100%;
  object-fit: cover;
}

.img{
  max-width: 100%;
  vertical-align: bottom;
}

.mydiv{
  margin: auto;
  padding: 10px;
}

.mydiv li{
 margin-left: 10px;
}
</style>