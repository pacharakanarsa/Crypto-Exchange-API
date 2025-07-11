const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post("/", async (requestAnimationFrame, res) => {
    try { 
        const { name, email, password } = requestAnimationFrame.body;
        const user = await User.create({
            name,
            email,
            passwordHash: password
        });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
})

//See user's wallet
router.get("/:id/wallet", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("wallet");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      userId: user._id,
      wallet: user.wallet
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//See all user
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("name email wallet");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;