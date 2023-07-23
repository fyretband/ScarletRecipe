<script>
import { mapState, mapActions } from 'pinia';
import { useRecipeStore } from '../stores/counter';
export default {
    name: "FindByLetter",
    data() {
        return {

        };
    },
    created() {
        const letter = this.$route.params.letter;
        this.findByLetter(letter);

    },
    computed: {
        ...mapState(useRecipeStore, ['letter']),


    },
    methods: {
        ...mapActions(useRecipeStore, ['findByLetter']),
        handlFindByLetter() {
            const letter = this.$route.params.letter;
            console.log(letter, 'masuk dissini')
            this.findByLetter(letter);
        },


    }
}
</script>

<template>
    <div>

        <div id="app" class="d-flex flex-wrap">
            <div v-for="recipe in letter" :key="recipe.idMeal" class="card card-hoverable">
                <img :src="recipe.strMealThumb" class="card-img-top" />
                <div class="card-body">
                    <h5 class="card-title">{{ recipe.strMeal }}</h5>

                    <!-- <p class="card-text">{{ recipe.strInstructions }}</p> -->
                    <p class="card-text"></p>
                    <div class="button-container">
                        <a :href="recipe.strYoutube" class="myButton">Watch Video</a>
                    </div>
                </div>


            </div>
        </div>

    </div>
</template>