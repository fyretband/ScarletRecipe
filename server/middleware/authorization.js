const {User, Recipe} = require('../models')

class Authorization {
    static async authorizationForDelete(req,res,next){
        try {
            const {id} = req.params
            const{userId, role} = req.additionalData 
            const user = await User.findOne({
                where: {
                    id: userId
                }
            })
            if(!user){
                throw {name: 'Forbidden'}
            }
            const Recipe = await Recipe.findOne({
                where: {
                    id: id
                }
            })
            if(!Recipe){
                throw {name: 'notFound'}
            }
            if(user.role != 'admin'){
                if(Recipe.userId != user.id)
                throw {name: 'Forbidden'}
            }
            next()
        }
        catch(err){
            next(err)
        }
    }

    static async authorizationUpdate(req,res,next){
        try {
            const {userId, role} = req.additionalData
            const user = await User.findOne({
                where: {
                    id: userId
                }
            })
            if(!user){
                throw {name: 'Forbidden'}
            }
            if(user.role != 'admin'){
                throw {name: 'Forbidden'}
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Authorization