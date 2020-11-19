const express = require('express');
const User = require('../Models/user');
const { authSchema } = require('../helpers/validation_schema');
const createError = require('http-errors');

const router = express.Router();

router.post('/register', async(req, res, next) => {
    const { email, password } = req.body;
    try {
        const result = await authSchema.validateAsync(req.body);
        const userAlreadyExist = await User.findOne({"email": result.email});
        if(userAlreadyExist) {
            throw createError.Conflict(`${result.email} is already been registered`);
        }

        const user = new User(result);
        // const savedUser = await user.save();

        res.send(savedUser);
    }
    catch (error) {
        if(error.isJoi === true) {
            error.status = 422;
        }
        next(error);
    }
});

router.post('/login', async(req, res, next) => {
    
});

router.post('/refresh-token', async(req, res, next) => {
    res.send('refresh-token route');
});

router.delete('/logout', async(req, res, next) => {
    res.send('logout route');
});

module.exports = router;