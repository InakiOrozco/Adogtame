const mongoose = require('mongoose');
const Schema = mongoose.Schema

const post_schema = new Schema({
	_id: mongoose.ObjectId,
	IdUser: mongoose.ObjectId,
	Title: String,
	Information: String,
	Photo: String,
	Location: String,
	ContactInfo: String,
	PetType: String,
	Resolved: Boolean
}, { timestamps: true });

const post = mongoose.model('Posts', post_schema);
module.exports = post;