<script>
import { mapActions, mapState } from 'pinia';
import { useRecipeStore } from '../stores/counter';

export default {
  name: 'CategoryFilter',
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  created() {
    const category = this.$route.params.category;
    this.filteredCategory(category);
  },
  computed: {
    ...mapState(useRecipeStore, ['Category']),
    paginatedCategories() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.Category.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.Category.length / this.itemsPerPage);
    },
  },
  methods: {
    ...mapActions(useRecipeStore, ['filteredCategory', 'mealsRecipe']),
    handleCategoryDetail() {
      const category = this.$route.params.category;
      this.filteredCategory(category);
    },

    pindah(value) {
      // console.log(value,' masuk');
      this.mealsRecipe(value)
    },

    goToPage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<template>
<div class="container">
    <h2>{{ this.$route.params.category }} Category</h2>
  <div id="app" class="d-flex flex-wrap">
    <div  v-for="category in paginatedCategories" :key="category.idMeal" class="mycard card-hoverable">
      <img :src="category.strMealThumb" class=" card-img-top" />
      <div class="mycard-body">
        <h5 class="card-title">{{ category.strMeal }}</h5>
      </div>
      <!-- <router-link :to="`/meals/search/${category.strMeal}`">
        <a class="myButton">View Recipes</a>
      </router-link> -->
      <div class="mycard-footer"><a class="btn" @click.prevent="pindah(category.strMeal)">View Recipes &#8594;</a></div>
    </div>
  </div>
  <div class="pagination-container">
    <a class="pagebtn" v-if="currentPage > 1" @click="goToPage(currentPage - 1)">
      &#171; 
    </a>
    <span>&nbsp; &nbsp;Page {{ currentPage }} of {{ totalPages }}&nbsp; &nbsp; </span>
    <a class="pagebtn" v-if="currentPage < totalPages" @click="goToPage(currentPage + 1)">
      &#187;
    </a>
  </div>
</div>


</template>

<style>
.pagebtn{
  
  font-size: 20px;
  color: black;
  padding-bottom: 10px;
}
.myButton:hover {
	background-color:#5cbf2a;
}
.myButton:active {
	position:relative;
	top:1px;
}
        
.d-flex {
  display: flex;
  flex-wrap: wrap;
}

.justify-content-center {
  justify-content: center;
}

.align-items-center {
  align-items: center;
}

.card {
  width: 300px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
}

.card-img-top {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-body {
  text-align: center;
}

.card-title {
  font-size: 20px;
  margin-top: 10px;
}

.pagination-container {
  display: block;
  text-align: center;
  margin-top: 10px;
}

.pagination-container button {
  margin: 0 5px;
}

.mycard-footer{
  position: absolute;
  bottom: 0;
  height: 50px;
  font-family: Helvetica;
  margin: 0;
}
</style>
