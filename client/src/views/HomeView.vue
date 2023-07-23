<script>
import { mapActions, mapState } from 'pinia';
import { useRecipeStore } from '../stores/counter';
import { RouterLink } from 'vue-router';


export default {
  name: 'HomeView',
  data() {
    return {
      searchQuery: ''
    }
  },
  created() {
    this.fetchCategory()
  },
  computed: {
    ...mapState(useRecipeStore, ['recipe', 'Category']),

  },
  methods: {
    ...mapActions(useRecipeStore, ['fetchCategory', 'filteredCategory','sendDonation']),
    handleSearch(name) {
      // const searchQuery = this.searchQuery.trim();

      this.filteredCategory(name);


      // Memperbarui URL dengan kata kunci pencarian
      // this.$router.push({ path: '/', query: { search: searchQuery } });
    },
  },

}
</script>

<template>
  <!-- <div>
      <section id="homesection" class="hero text-center py-5">
      <div class="container">
        <h1>Welcome to Scarlet Recipe </h1>
        <p>Discover delicious recipes from around the world.</p><br/>
        <router-link to="/meals/random">
          <a id="randomBtn">No Idea What to Cook? Try Our Random Meals</a>
        </router-link>
      </div>
      <br/>
      <br/>
    </section>
    

   
    <section class="categories py-5">
      <div class="container">
        <h2 class="text-left mb-4">Recipe Categories</h2>
        <div class="row">
          <div v-for="category in recipe" :key="category.idCategory" class="col-md-4">
            <div class="mycard mb-4">
              <img :src="category.strCategoryThumb" class=" card- card-img-top" :alt="category.strCategory">
              <div class="mycard-body">
                <h5 class="card-title">{{ category.strCategory }}</h5>
              </div>
              <div class="card-footer">
                <p class="card-text" v-if="category.strCategory == 'Vegan' || category.strCategory == 'Starter' || category.strCategory == 'Vegetarian'">{{ category.strCategoryDescription.slice(0, 100)+'...' }}</p>
                <p class="card-text" v-else>{{ category.strCategoryDescription.slice(0, category.strCategoryDescription.indexOf("."))+'.' }}</p>
                <router-link :to="`/meals/category/${category.strCategory}`">
                  <a class="">View Category List &#8594;</a>
              </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
   <div>
    <input v-model="donationAmount" type="number" placeholder="Masukkan jumlah donasi">
    <button @click="sendDonation()">Kirim Donasi</button>
  </div>
  <div>
    <section id="homesection" class="hero text-center py-5">
      <div class="container">
        <h1>Welcome to Scarlet Recipe </h1>
        <p>Discover delicious recipes from around the world.</p><br/>
        <router-link to="/meals/random">
          <a id="myButton">No Idea What to Cook? Try Our Random Meals</a>
        </router-link>
      </div>
      <br/>
      <br/>
    </section>

    
    <section class="categories py-5">
      <div class="container">
        <h2 class="text-center mb-4">Recipe Categories</h2>
        <div class="row">
          <div v-for="category in recipe" :key="category.idCategory" class="col-md-4">
            <div class="card mb-4">
              <img :src="category.strCategoryThumb" class="card-img-top" :alt="category.strCategory">
              <div class="card-body">
                <h5 class="card-title">{{ category.strCategory }}</h5>
                <router-link :to="`/meals/category/${category.strCategory}`">
                  <a class="myButton">View Category List</a>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
  </div>
  <h5>Want to create your own Recipe? Click this Button Below</h5>
  <RouterLink to="recipe/add">
    <div>
     
      <button class="myButton">Add Recipe</button>
    </div>
  </RouterLink> -->
 
  <div>
      <section id="homesection" class="hero text-center py-5">
      <div class="container">
        <h1>Welcome to Scarlet Recipe </h1>
        <p>Discover delicious recipes from around the world.</p><br/>
        <router-link to="/meals/random">
          <a id="randomBtn">No Idea What to Cook? Try Our Random Meals</a>
        </router-link>
      </div>
      <br/>
      <br/>
    </section>
    

    <!-- Recipe Categories Section -->
    <section class="categories py-5">
      <div class="container">
        <h2 class="text-left mb-4">Recipe Categories</h2>
        <div class="row">
          <div v-for="category in recipe" :key="category.idCategory" class="col-md-4">
            <div class="mycard mb-4">
              <img :src="category.strCategoryThumb" class=" card- card-img-top" :alt="category.strCategory">
              <div class="mycard-body">
                <h5 class="card-title">{{ category.strCategory }}</h5>
              </div>
              <div class="card-footer">
                <p class="card-text" v-if="category.strCategory == 'Vegan' || category.strCategory == 'Starter' || category.strCategory == 'Vegetarian'">{{ category.strCategoryDescription.slice(0, 100)+'...' }}</p>
                <p class="card-text" v-else>{{ category.strCategoryDescription.slice(0, category.strCategoryDescription.indexOf("."))+'.' }}</p>
                <router-link :to="`/meals/category/${category.strCategory}`">
                  <a class="">View Category List &#8594;</a>
              </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  
</template>
<style>
@import url('https://fonts.googleapis.com/css?family=Manjari&display=swap');


#randomBtn {
  background-color: transparent;
  border: 1px solid #266DB6;
  box-sizing: border-box;
  color: #00132C;
  font-family: "Avenir Next LT W01 Bold",sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  padding: 16px 23px;
  position: relative;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  z-index:1;
}

#randomBtn:hover,
#randomBtn:active {
  outline: 0;
}

#randomBtn:hover {
  background-color: transparent;
  cursor: pointer;
}

#randomBtn:before {
  background-color: #D5EDF6;
  content: "";
  height: calc(100% + 3px);
  position: absolute;
  right: -7px;
  top: -9px;
  transition: background-color 300ms ease-in;
  width: 100%;
  z-index: -1;
}

#randomBtn:hover:before {
  background-color: #6DCFF6;
}

@media (min-width: 768px) {
  #randomBtn {
    padding: 12px 32px;
  }
}

 #homesection{
  background-image: url("src/assets/pics/Home_randomrecipe_section.png");
  background-position:center;
  background-repeat: no-repeat;
  background-size:cover;
  background-origin: padding-box;
} 

.mycard {
  position: relative;
  background-color: #FFFFFF;
  height: 370px;
  width: 300px;
  margin: 10px;
  overflow: hidden;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.5);
  border-radius: unset;
  padding-top: 0;
  padding-bottom: 0;
}

.mycard:hover {
  scale: 1.1;
}

.card-image {
  /* center horizontally overflown image */
  position: absolute;
  left: -9999px;
  right: -9999px;
  margin: auto;

  height: 220px;
  min-width: 100%;
}

.mycard-body{
  position: absolute;
  padding: 15px;
  
}
.card-footer {
  position: absolute;
  bottom: 0;
  height: 130px;
  padding: 12px 15px;
  font-family: Helvetica;
  margin: 0;
}
.card-text {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
  text-align: justify;;
}
.card-title {
  font-family: Serif;
}
/* .myButton {
  box-shadow: 3px 4px 0px 0px #1564ad;
  background: linear-gradient(to bottom, #79bbff 5%, #378de5 100%);
  background-color: #79bbff;
  border-radius: 5px;
  border: 1px solid #337bc4;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 17px;
  font-weight: bold;
  padding: 12px 44px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #528ecc;
}

.myButton:hover {
  background: linear-gradient(to bottom, #378de5 5%, #79bbff 100%);
  background-color: #378de5;
}

.myButton:active {
  position: relative;
  top: 1px;
} */


</style>
