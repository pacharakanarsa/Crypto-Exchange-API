const mongoose = require("mongoose");

const CurrencySchema = new mongoose.Schema({
    symbol: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    currentPrice: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Currency", CurrencySchema);