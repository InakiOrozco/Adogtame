const mongoose = require('mongoose');
const Schema = mongoose.Schema

const group_posts_schema = new Schema({
	id_group: String,
	id_post: String
}, { timestamps: true });

const groups = mongoose.model('Group-Post', group_posts_schema);
module.exports = groups;