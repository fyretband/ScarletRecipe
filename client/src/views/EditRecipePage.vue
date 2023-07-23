<script>
import { mapActions, mapState } from 'pinia';
import { useRecipeStore } from '../stores/counter';

export default {
    name: 'editRecipePage',
    data() {
        return {
            recipe: null,
            editedRecipe: {
                id: 0,
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
    computed: {
        ...mapState(useRecipeStore, ['findId'])
    },
    methods: {
        ...mapActions(useRecipeStore, ['editRecipe','getRecipe']),
        async fetchData() {
            const id = this.$route.params.id;
            // Ambil data resep dari toko berdasarkan ID
           await this.getRecipe(id);
            // Isi editedRecipe dengan data resep yang ditemukan
            
        },
        async handleSubmitEdit() {
            const id = this.$route.params.id
           
            this.editRecipe(id,this. editedRecipe.title,this. editedRecipe.description,this.editedRecipe.instructions,this.editedRecipe.prepTime,this. editedRecipe.cookTime,this. editedRecipe.servings,this. editedRecipe.categoryId)
        },
      
    },
    async created() {
        await this.fetchData();
       
        const {id,title,description,instructions,prepTime,cookTime,servings,categoryId} = this.findId
        this.editedRecipe= {id,title,description,instructions,prepTime,cookTime,servings,categoryId}
    },
};
</script>

<template>
   
    <div>
        <h2>Edit Recipe</h2>
        <form @submit.prevent="handleSubmitEdit" class="my-4">
            <div class="form-group">
                <label for="title">Title:</label>
                <input v-model="editedRecipe.title" type="text" id="title" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea v-model="editedRecipe.description" id="description" class="form-control" required></textarea>
            </div>
            <div class="form-group">
                <label for="instructions">Instructions:</label>
                <textarea v-model="editedRecipe.instructions" id="instructions" class="form-control" required></textarea>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="prepTime">Preparation Time (in minutes):</label>
                    <input v-model="editedRecipe.prepTime" type="number" id="prepTime" class="form-control" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="cookTime">Cooking Time (in minutes):</label>
                    <input v-model="editedRecipe.cookTime" type="number" id="cookTime" class="form-control" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="servings">Servings:</label>
                    <input v-model="editedRecipe.servings" type="number" id="servings" class="form-control" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="categoryId">Category ID:</label>
                    <input v-model="editedRecipe.categoryId" type="number" id="categoryId" class="form-control" required>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Update Recipe</button>
        </form>
    </div>
</template>
