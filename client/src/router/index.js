import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterPage from '../views/RegisterPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RandomMeals from '../views/RandomMeals.vue'
import CategoryFilter from '../views/CategoryFilter.vue'
import MealsRecipe from '../views/MealsRecipe.vue'
import { useRecipeStore } from '../stores/counter'
import FindByLetter from '../views/FindByLetter.vue'
import createRecipePage from '../views/createRecipePage.vue'
import RecipeDb from '../views/RecipeDb.vue'
import EditRecipePage from '../views/EditRecipePage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterPage
   
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
   
    },
    {
      path: '/meals/random',
      name: 'randomMeals',
      component: RandomMeals
    },
    {
      path: '/meals/search/:name',
      name: 'MealsRecipe',
      component: MealsRecipe
    },
    {
      path: '/meals/category/:category',
      name: 'CategoryFilter',
      component: CategoryFilter
    },
    {
      path: '/meals/find/:letter',
      name: 'FindByLetter',
      component: FindByLetter
    },
    {
      path: '/recipe/add',
      name: 'createRecipePage',
      component: createRecipePage
    },
    {
      path: '/recipe',
      name: 'RecipeDb',
      component: RecipeDb
    },
    {
      path: '/recipe/:id',
      name: 'EditRecipePage',
      component: EditRecipePage
    },
  
    {
      path: '/protected-route',
      component: LoginPage,
      beforeEnter: (to, from, next) => {
        const recipeStore = useRecipeStore();
        if (recipeStore.isAuthenticated) {
          next();
        } else {
          next('/login'); // Redirect to the login page if not logged in
        }
      },
    },
    // { path: '/auth/facebook', component: FacebookAuth },
    // { path: '/auth/facebook/success', component: FacebookSuccess },
    // { path: '/auth/facebook/error', component: FacebookError },
   

  ]
})
router.beforeEach(async (to, from,next) => {
  if (to.name === "login" && localStorage.getItem("access_token")) {
    return { name: "home" };
  }else if(to.name === "register" && localStorage.getItem("access_token")) {
    return { name: "home" };
  }else{
    next()
  }
 
  // }
  // if (to.name !== "login" && !localStorage.getItem("access_token")) {
  //   return { name: "register" };
  // }
});

export default router
