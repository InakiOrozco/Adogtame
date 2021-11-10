const mongoose = require('mongoose');
const Schema = mongoose.Schema

const comments_schema = new Schema({
	IdComments: mongoose.ObjectId,
	IdPost: String,
	Description: String
}, { timestamps: true });

const groups = mongoose.model('user', comments_schema);
module.exports = groups;