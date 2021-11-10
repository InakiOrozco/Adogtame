const mongoose = require('mongoose');
const Schema = mongoose.Schema

const post_schema = new Schema({
	IdPost: mongoose.ObjectId,
	IdUser: String,
	Title: String,
	Information: String,
	Photo: String,
	Location: String,
	ContactInfo: String,
	PetType: String,
	Resolved: Boolean
}, { timestamps: true });

const post = mongoose.model('user', post_schema);
module.exports = post;