const mongoose = require('mongoose');
const Schema = mongoose.Schema

const group_user_schema = new Schema({
	id_group: String,
	id_user: String,
	permissions: Boolean
}, { timestamps: true });

const groups = mongoose.model('Group-Users', group_user_schema);
module.exports = groups;