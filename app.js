const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// โหลด dotenv
dotenv.config();

const app = express();
app.use(express.json());

// เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));


const userRoutes = require("./routes/user.routes");
const transactionRoutes = require("./routes/transaction.routes");

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server started at http://localhost:${PORT}`);
});