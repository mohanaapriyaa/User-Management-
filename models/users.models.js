const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Email: String,
    Name: String,
    DOB: String
}, { timestamps: true })




module.exports = mongoose.model('users', UserSchema)
