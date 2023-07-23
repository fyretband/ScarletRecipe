const axios = require('axios');

const { Recipe, Category, User } = require('../models')

async function searchMealsByFirstLetter(letter) {
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        return response.data;
    } catch (error) {
        throw new Error('Error searching meals by first letter');
    }
}

async function searchMealByName(name) {
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        return response.data;
    } catch (error) {
        throw new Error('Error searching meal by name');
    }
}



class RecipeController {
    static async searchMeal(req, res, next) {

        const { name } = req.params;
        console.log(req.params)
        try {
            const result = await searchMealByName(name);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to search meal' });
        }
    }
    static async searchMealsByFirstLetter(req, res, next) {
        const { letter } = req.params;
        try {
            const result = await searchMealsByFirstLetter(letter);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to search meals by first letter' });
        }
    }
    static async getRandomMeal(req, res, next) {
        try {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
            console.log(response.data)
            return res.json(response.data);
        } catch (error) {
            throw new Error('Error getting random meal');
        }
    }
    static async filterByMainIngredient(req, res, next) {
        const { ingredient } = req.query;
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
            return res.json(response.data);
        } catch (error) {
            throw new Error('Error filtering meals by main ingredient');
        }
    }
    static async filterByCategory(req, res, next) {
        const { category } = req.params;

        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);

            return res.json(response.data);

        } catch (error) {
            throw new Error('Error filtering meals by category');
        }
    }

    static async createRecipe(req, res, next) {
        try {
            const { userId } = req.additionalData // Pastikan req.additionalData berisi nilai yang valid
            if (!userId) {
                return res.status(400).json({ error: 'Missing userId' });
            }

            const { title, description, instructions, prepTime, cookTime, servings, categoryId } = req.body;


            const recipe = await Recipe.create({ title, description, instructions, prepTime, cookTime, servings, categoryId, userId });
            res.status(201).json({
                id: recipe.id,
                title: recipe.title,
                description: recipe.description,
                instructions: recipe.instructions,
                prepTime: recipe.prepTime,
                cookTime: recipe.cookTime,
                servings: recipe.servings,
                categoryId: recipe.categoryId,
                userId: recipe.userId,
            });
        } catch (err) {
            next(err)
        }

    }

    static async findAllRecipe(req, res, next) {
        try {
            const { userId } = req.additionalData // Pastikan req.additionalData berisi nilai yang valid
            if (!userId) {
                return res.status(400).json({ error: 'Missing userId' });
            }
            const data = await Recipe.findAll({
                where: {
                    userId
                }
            })
            res.status(201).json({
                data
            });
        } catch (err) {
            next(err)
        }
    }

    static async deleteRecipe(req, res, next) {
        try {
            const { id } = req.params
            const recipes = await Recipe.findByPk(id)
            const deletedRecipe = await Recipe.destroy({
                where: {
                    id: id
                }
            })
            if (deletedRecipe) {
                res.status(200).json({
                    statusCode: 200,
                    message: `${recipes.title} telah didelete`
                })
            } else if (!recipes) {
                throw { name: 'notFound' }
            }
        } catch (err) {
            next(err)
        }
    }
    static async findRecipe(req,res,next){
        try {
            const { id } = req.params;
            const { userId } = req.additionalData;

            if (!userId) {
                return res.status(400).json({ error: 'Missing userId' });
            }

            

            const recipe = await Recipe.findOne({
                where: {
                    id: id,
                    userId: userId
                }
            });
            res.status(200).json({ recipe });
        } catch (err) {
            next(err)
        }
    }
    static async updateRecipe(req, res, next) {
       console.log('hahaha')
        try {
            const { id } = req.params;
            const { userId } = req.additionalData;

            if (!userId) {
                return res.status(400).json({ error: 'Missing userId' });
            }

            const { title, description, instructions, prepTime, cookTime, servings, categoryId } = req.body;
            console.log(req.body)

            const recipe = await Recipe.findOne({
                where: {
                    id: id,
                    userId: userId
                }
            });

            if (!recipe) {
                return res.status(404).json({ error: 'Recipe not found or unauthorized' });
            }
            await Recipe.update(
                {
                    title: title || recipe.title,
                    description: description || recipe.description,
                    instructions: instructions || recipe.instructions,
                    prepTime: prepTime || recipe.prepTime,
                    cookTime: cookTime || recipe.cookTime,
                    servings: servings || recipe.servings,
                    categoryId: categoryId || recipe.categoryId
                },
                {
                    where: {
                        id: id,
                        userId: userId
                    }
                }
            );

            res.status(200).json({ message: 'Recipe updated successfully', recipe });
        } catch (err) {
            next(err);
        }
    }

}

module.exports = RecipeController;

