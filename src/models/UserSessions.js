const mongoose = require('mongoose');
const Schema = mongoose.Schema

const usser_sessions = new Schema({
    IdUsserSession: mongoose.ObjectId,
    IdUser: mongoose.ObjectId,
    Token: String
}, { timestamps: true });

const usersSessions = mongoose.model('UsersSessions', usser_sessions);
module.exports = usersSessions;