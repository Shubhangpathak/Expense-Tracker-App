const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Users = new Schema({
    username: String,
    password: String,
})

const UserModel = mongoose.model("users", Users);

module.exports = {
    UserModel: UserModel
}