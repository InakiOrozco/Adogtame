const mongoose = require('mongoose');
const Schema = mongoose.Schema

const user_squema = new Schema({
    email :{
        type : String,
        require : true
    },
    password: {
        type: String,
        require : true
    }
}, {timestamps : true});

const user = mongoose.model('user', user_squema);
module.exports = user;