const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");

// Buy
router.post("/buy", async (req, res) => {
    try{
        const { userId, currency, amount, price } = req.body;
        const total = amount * price;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found"});

        const index = user.wallet.findIndex(w => w.currency === currency);
        if (index !== -1) {
            user.wallet[index].balance += amount;
        } else {
            user.wallet.push({ currency, balance: amount});
        }

        await user.save();

        const txn = await Transaction.create({
            type: "buy",
            fromUser: null,
            toUser: user._id,
            currency,
            amount,
            price,
            total
        });

        res.json({message: "Buy successfull", txn });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Sell
router.post("/sell", async(req, res) => {
    try{
        const { userId, currency, amount, price } = req.body;
        const total = amount * price;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({error: "User not found" });

        const wallet = user.wallet.find(w => w.currency === currency);
        if (!wallet || wallet.balance < amount){
            return res.status(400).json({error: "Insufficient balance"});
        }

        wallet.balance -= amount;
        await user.save();

        const txn = await Transaction.create({
            type: "sell",
            fromUser: user._id,
            currency,
            amount,
            price,
            total
        });

        res.json({ message: "Sell successful", txn });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/transfer", async (req,res) =>{
    try{
        const { fromUserId, toUserId, currency, amount } = req.body;

        const fromUser = await User.findById(fromUserId);
        const toUser = await User.findById(toUserId);

        if (!fromUserId || !toUser) return res.status(404).json({ error: "USer not found"});

        const fromWallet = fromUser.wallet.find(w => w.currency === currency);
        if (!fromWallet || fromWallet.balance < amount) {
            return res.status(400).json({ error: "Insufficient balance"});
        }

        fromWallet.balance -= amount;

        const toWallet = toUser.wallet.find( w => w.currency === currency);
        if (toWallet) {
            toWallet.balance += amount;
        } else { 
            toUser.wallet.push({ currency, balance: amount });
        }

        await fromUser.save();
        await toUser.save();

        const txn = await Transaction.create({
            type: "transfer",
            fromUser: fromUser._id,
            toUser: toUser._id,
            currency,
            amount,
            price: 0,
            total: 0
        });

        res.json({ message: "Transfer successful", txn });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/list/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const txns = await Transaction.find({
            $or: [{ fromUser: userId }, { toUser: userId }]
        }).sort({ timestap: -1 });

        res.json(txns);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;