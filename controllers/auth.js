const User = require('../models/user');
const { authSchema } = require('../helpers/validation_schema');
const { signAccessToken } = require('../helpers/jwt_helper')
const createError = require('http-errors');

module.exports = {
    register: async(req, res, next) => {        
        try {
            const result = await authSchema.validateAsync(req.body);
            const userAlreadyExist = await User.findOne({ email: result.email });
            if(userAlreadyExist) {
                throw createError.Conflict(`${result.email} is already been registered`);
            }
    
            const user = new User(result);
            const savedUser = await user.save();
            const accessToken = await signAccessToken(savedUser.id);
            res.send({ accessToken });
        }
        catch (error) {
            if(error.isJoi === true) {
                error.status = 422;
            }
            next(error);
        }
    },

    login: async(req, res, next) => {
        try {
            const result = await authSchema.validateAsync(req.body);
            
            const user = await User.findOne({email: result.email});
            if (!user)
                throw createError.NotFound("User not registered");
            
            const isMatch = await user.isValidPassword(result.password);
            if (!isMatch)
                throw createError.Unauthorized("Username/Password not valid");
            
            const accessToken = await signAccessToken(user.id);
            return res.send({ accessToken });
            
        } catch (error) {
            if(error.isJoi === true) {
                return next(createError.BadRequest("Invalid Username/Password"));
            }
            next(error);
        }
    },

    refresh_token: {

    },

    logout: {

    }
}