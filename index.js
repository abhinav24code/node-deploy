require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

const server = express();

/* ---------- DB ---------- */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch(console.error);

/* ---------- MIDDLEWARE ---------- */
server.use(cors());
server.use(express.json());
server.use(morgan("dev"));

/* ---------- API ROUTES ---------- */
server.use("/products", productRouter.router);
server.use("/users", userRouter.router);

/* ---------- FRONTEND ---------- */
const frontendDistPath = path.join(__dirname, "frontend", "dist");
server.use(express.static(frontendDistPath));

/* ✅ React Router FIX */
server.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
