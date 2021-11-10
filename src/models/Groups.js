const mongoose = require('mongoose');
const Schema = mongoose.Schema

const groups_schema = new Schema({
	IdGroup: mongoose.ObjectId,
	Name: String,
	Description: String
}, { timestamps: true });

const groups = mongoose.model('Groups', groups_schema);
module.exports = groups;