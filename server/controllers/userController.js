const { generateToken } = require('../helper/jwt')
const { User,Donation } = require('../models')
const bcrypt = require('bcrypt')
const { OAuth2Client } = require('google-auth-library');
const googleClientId = process.env.googleClientId

class UserController {
    static async register(req, res, next) {
        try {
            const { name, email, password } = req.body;

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                throw { name: "EmailAlreadyExists", message: "Email already exists" };
            }

            const user = await User.create({ name, email, password });

            if (!user) {
                throw { name: "SequelizeValidationError" };
            }

            res.status(201).json({
                statusCode: 201,
                message: "User created successfully",
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async login(req, res, next) {
        console.log(req.body)
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: { email }
            })

            if (!user) {
                throw { name: "LoginError" }
            }

            if (user) {

                const isValidPassword = bcrypt.compareSync(password, user.password)

                if (isValidPassword) {
                    const token = generateToken({
                        id: user.id,
                        email: user.email,
                        password: user.password
                    })

                    res.status(200).json({
                        statusCode: 200,
                        message: 'Login succesful',
                        token: token,
                        username: user.username
                    })
                }

            }


        }
        catch (err) {

            next(err)

        }
    }
    static async donation(req,res,next){
       
        const {userId}  = req.additionalData;
      
        try {
       
          const donation = await Donation.create({ UserId: userId, amount:10000 });
      
        
          res.status(201).json(donation);
        } catch (error) {
          console.log(error)
          next()
       
        }
    }
   
}
module.exports = UserController