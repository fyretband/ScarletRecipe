<script>
import { mapState, mapActions } from 'pinia';
import { useRecipeStore } from '../stores/counter';

export default {
    name: "RecipeDb",
    created() {
        this.getAllRecipe()
    },
    computed: {
        ...mapState(useRecipeStore, ['recipeDb']),

    },
    methods: {
        ...mapActions(useRecipeStore, ['getAllRecipe', 'deleteRecipe', 'editRecipe']),
        fetchRecipe() {
            this.getAllRecipe
        },
        handleDelete(id) {

            this.deleteRecipe(id)
        },
        handleEdit(id) {
            this.editRecipe(id)

        }
    }
}
</script>

<template>
    <div class="table-responsive">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Instructions</th>
                    <th>Preparation Time</th>
                    <th>Cooking Time</th>
                    <th>Servings</th>
                    <th>Category ID</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="recipe in recipeDb.data ">
                    <td>{{ recipe.title }}</td>
                    <td>{{ recipe.description }} </td>
                    <td>{{ recipe.instructions }} </td>
                    <td>{{ recipe.prepTime }}Minutes</td>
                    <td>{{ recipe.cookTime }} Minutes</td>
                    <td>{{ recipe.servings }} minutes</td>
                    <td>{{ recipe.categoryId }}</td>
                    <td>
                        <router-link :to="`/recipe/${recipe.id}`" class="myButton2">Edit</router-link>
                        <button @click.prevent="handleDelete(recipe.id)" :key="recipe.id" type="submit"
                            class="myButton1">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
.myButton1 {
    box-shadow: 3px 4px 0px 0px #ad1515;
    background: linear-gradient(to bottom, #ff7979 5%, #e53737 100%);
    background-color: #ff7979;
    border-radius: 5px;
    border: 1px solid #c43333;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 17px;
    font-weight: bold;
    padding: 12px 44px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #cc5252;
}

.myButton2 {
    box-shadow: 3px 4px 0px 0px #22ad15;
    background: linear-gradient(to bottom, #0ab638 5%, #07ee0b 100%);
    background-color: #07ee0b;
    border-radius: 5px;
    border: 1px solid #06f23d;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 17px;
    font-weight: bold;
    padding: 12px 44px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #cc5252;
}

.myButton1:hover {
    background: linear-gradient(to bottom, #e53737 5%, #ff7979 100%);
    background-color: #e53737;
}

.myButton1:active {
    position: relative;
    top: 1px;
}
</style>