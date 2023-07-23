const axios = require('axios');
const midtransClient = require('midtrans-client');
const {Category} = require('../models')
class CategoryController {
    static async getAllMealCategories(req, res, next) {
        try {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
          
            return res.json(response.data);

            
            
        } catch (error) {
            throw new Error('Error getting meal categories');
        }
    }
    static async getAllCategories(req, res, next) {
        try {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
            return res.json(response.data);
        } catch (error) {
            throw new Error('Error getting categories');
        }
    }

    static async getAllAreas(req, res, next) {
        try {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
            return res.json(response.data);
        } catch (error) {
            throw new Error('Error getting areas');
        }
    }

    static async getAllIngredients(req, res, next) {
        try {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
            return res.json(response.data);
        } catch (error) {
            throw new Error('Error getting ingredients');
        }
    }
    static async filterByArea(req, res, next) {
        const { area } = req.query;
        try {
          const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
          return res.json(response.data);
        } catch (error) {
          throw new Error('Error filtering meals by area');
        }
      }

      static async createCategory(req,res,next){
        try {
           
            const name = req.body
            console.log(req.body)
            const category = await Category.create(name);
            res.status(201).json({
                id: category.id,
                name: category.name
            });
        } catch (err) {
            next(err)
        }
      }
      static async generateMidtransToken(req, res, next) {
        // cart.findall 

        // const finduser = await Users.findByPk(req.Users.id)
        // bikin kondisi kalo item uda kosong 
        //bikin error handler nya juga 
        // if (finduser.) {
        //     throw { name: "Item_has_been_sold" }
        // }
        try {
            let snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });

            let parameter = {
                transaction_details: {
                    order_id: "TRANSACTION" + Math.floor(1000000 + Math.random() * 88888888),
                    gross_amount: 10000
                },
                credit_card: {
                    secure: true
                },
                customer_details: {
                    name: "budi",
                    email: "budi.pra@example.com",
                }
            };

            const midtransToken = await snap.createTransaction(parameter)
            res.status(201).json(midtransToken) // endpoint generate token

            console.log(midtransToken, "trigger di postman kalo mo liat");
            // KL mau pop up client hasil clg lnsng di paste aja 
            // ato kalo ga mau bisa click redirect ke new tab, url dri clg nya aja 
        } catch (error) {
            next (error)
        }
    }

}

module.exports = CategoryController