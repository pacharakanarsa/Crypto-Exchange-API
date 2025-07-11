require("dotenv").config();
const mongoose = require("mongoose");
const Currency = require("../models/currency.model");

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    await Currency.deleteMany();

    await Currency.insertMany([
      { symbol: "BTC", name: "Bitcoin", currentPrice: 1000000 },
      { symbol: "ETH", name: "Ethereum", currentPrice: 500000 },
      { symbol: "XRP", name: "Ripple", currentPrice: 20000 },
      { symbol: "DOGE", name: "Dogecoin", currentPrice: 200 }
    ]);
    console.log("Seeded currencies");
    process.exit();
  })
  .catch(err => {
    console.error("Error seeding:", err);
    process.exit(1);
  });
