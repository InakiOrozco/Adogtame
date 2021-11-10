const mongoose = require('mongoose');
const Schema = mongoose.Schema

const comments_schema = new Schema({
	IdComments: mongoose.ObjectId,
	IdPost: mongoose.ObjectId,
	IdUser: mongoose.ObjectId,
	Comment: String
}, { timestamps: true });

const groups = mongoose.model('Comments', comments_schema);
module.exports = groups;