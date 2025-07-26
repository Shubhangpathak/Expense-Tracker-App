const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//old schema
const Users = new Schema({
    username: String,
    password: String,
})

//new schema
const Expense = new Schema({
    ownerId: { type: ObjectId, ref: 'users', required: true },
    type: { type: String, enum: ['expense', 'income'], required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String, default: '' }
}, { timestamps: true })

const UserBalance = new Schema({
    ownerId: { type: ObjectId, ref: 'users', required: true },
    currentBalance: { type: Number, default: 0 }
}, { timestamps: true })

//old exports
const UserModel = mongoose.model("users", Users);
//new exports
const ExpenseModel = mongoose.model("expenses", Expense);
const BalanceModel = mongoose.model("balances", UserBalance)

module.exports = {
    UserModel: UserModel,
    ExpenseModel: ExpenseModel,
    BalanceModel: BalanceModel
}