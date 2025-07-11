const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    type:{
        type: String,
        enum: ['buy', 'sell', 'transfer'],
        required: true
    },
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    currency: { type: String, required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, requrie: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", TransactionSchema);