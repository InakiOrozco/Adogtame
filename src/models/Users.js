const mongoose = require('mongoose');
const Schema = mongoose.Schema

const user_schema = new Schema({
    IdUser: mongoose.ObjectId,
    Email: String,
    Password: String,
    Name: String,
    LastName: String,
    DateBirth: Date,
    Tags: String,
    PhoneNumber: String,
    ProfilePicture: String
}, { timestamps: true });

const user = mongoose.model('Users', user_schema);
module.exports = user;