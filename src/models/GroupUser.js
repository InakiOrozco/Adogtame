const mongoose = require('mongoose');
const Schema = mongoose.Schema

const group_user_schema = new Schema({
	IdGroup: String,
	IdUser: String,
	Permissions: String
}, { timestamps: true });

const groups = mongoose.model('Group-Users', group_user_schema);
module.exports = groups;