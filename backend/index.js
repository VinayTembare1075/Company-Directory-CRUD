require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db");

const app = express();
const PORT = 8080;

// ✅ Middleware FIRST
app.use(cors());
app.use(express.json());

// ✅ Routes AFTER middleware
const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// DB Connection
connection();

// Debug
console.log(process.env.MONGO_URL);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});