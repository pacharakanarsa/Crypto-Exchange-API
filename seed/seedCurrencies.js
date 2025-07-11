const mongoose = require("mongoose");
const Currency = require("../models/currency.model");

mongoose.connect("mongodb://127.0.0.1:27017/crypto-exchange")
  .then(async () => {
    await Currency.insertMany([
      { symbol: "BTC", name: "Bitcoin" },
      { symbol: "ETH", name: "Ethereum" },
      { symbol: "XRP", name: "Ripple" },
      { symbol: "DOGE", name: "Dogecoin" }
    ]);
    console.log("✅ Seeded currencies");
    process.exit();
  })
  .catch(err => {
    console.error("❌ Error seeding:", err);
    process.exit(1);
  });
