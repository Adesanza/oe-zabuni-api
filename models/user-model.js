const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {
        type: string,
        required: true
    },
    last_name: {
        type: string,
        required: true
    },
    company: {
        type: string,
        required: true
    },
    email: {
        type: string,
        required: true
    },
    password: {
        type: string,
        required: true
    },
    role: {
        type: string,
        enum: ['admin','marketing','technical','operations','finance'],
        required: true
    },
    is_admin: {
        type: boolean,
        default: false
    }

})

const User = mongoose.model('User',userSchema);

module.exports = User;