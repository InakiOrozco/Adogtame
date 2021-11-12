const mongoose = require('mongoose');
const Schema = mongoose.Schema

const group_posts_schema = new Schema({
	IdGroup: String,
	IdPost: String
}, { timestamps: true });

const groups = mongoose.model('Group-Post', group_posts_schema);
module.exports = groups;