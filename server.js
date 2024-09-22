require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const authRoutes = require("./routing/authRoutes");
const productRoutes = require("./routing/productRoutes");
const userRoutes = require("./routing/userRoutes");
const cartRoutes = require("./routing/cartRoutes");
const categoryRoutes = require("./routing/categoryRoutes");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: [
      process.env.ORIGIN,
      process.env.ADMIN_ORIGIN,
      "https://ecommerce-frontend-sigma-seven.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/categories", categoryRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB();
});
