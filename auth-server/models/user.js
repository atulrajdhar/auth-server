const mongoose = require('mongoose');
const { getBcryptHash, compareBcryptHash } = require('security');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', async function (next) {
    try {        
        const hashedPassword = await getBcryptHash(this.password, 10);
        this.password = hashedPassword;
        next();
    }
    catch(error) {
        next(error);
    }
});

UserSchema.methods.isValidPassword = async function (password) {
    try {
        return await compareBcryptHash(password, this.password);
    } catch (error) {
        throw error;
    }
}

const User = mongoose.model('user', UserSchema);
module.exports = User;