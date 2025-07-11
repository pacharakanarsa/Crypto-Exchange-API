const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    currency: { type: String, required: true },
    balance: { type: Number, default: 0 }
});

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    wallet: [walletSchema],
    createdAt: { type: Date, default: Date.now }
});



module.exports = mongoose.model("User", UserSchema);