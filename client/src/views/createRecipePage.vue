<script>
import { mapActions } from 'pinia';
import { useRecipeStore } from '../stores/counter';

export default {
    name: 'createRecipePage',
    data() {
        return {
            recipeList: {
                title: '',
                description: '',
                instructions: '',
                prepTime: 0,
                cookTime: 0,
                servings: 0,
                categoryId: 0,
            },
        };
    },
    methods: {
        ...mapActions(useRecipeStore, ["addRecipe"])
        // handleSubmit(){
        //     this.addRecipe(this.title,this.description,this.instructions,this.prepTime,this.cookTime,this.servings,this.categoryId)
        // }

    }

}
</script>
<template>
    <div>
        <h2>Create Recipe</h2>
        <form @submit.prevent="addRecipe(recipeList)" class="my-4">
            <div class="form-group">
                <label for="title">Title:</label>
                <input v-model="recipeList.title" type="text" id="title" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea v-model="recipeList.description" id="description" class="form-control" required></textarea>
            </div>
            <div class="form-group">
                <label for="instructions">Instructions:</label>
                <textarea v-model="recipeList.instructions" id="instructions" class="form-control" required></textarea>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="prepTime">Preparation Time (in minutes):</label>
                    <input v-model="recipeList.prepTime" type="number" id="prepTime" class="form-control" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="cookTime">Cooking Time (in minutes):</label>
                    <input v-model="recipeList.cookTime" type="number" id="cookTime" class="form-control" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="servings">Servings:</label>
                    <input v-model="recipeList.servings" type="number" id="servings" class="form-control" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="categoryId">Category ID:</label>
                    <input v-model="recipeList.categoryId" type="number" id="categoryId" class="form-control" required>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Create Your Own Recipe</button>
        </form>
    </div>
</template>