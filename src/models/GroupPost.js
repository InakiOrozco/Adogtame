const mongoose = require('mongoose');
const Schema = mongoose.Schema

const group_posts_schema = new Schema({
	IdGroup: mongoose.ObjectId,
	IdPost: mongoose.ObjectId
}, { timestamps: true });

const groups = mongoose.model('Group-Post', group_posts_schema);
module.exports = groups;