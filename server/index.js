import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import envConfig from "./config/envConfig.js";
import authRoutes from "./routes/userRoutes.js";
import categoryRoutes from "../server/routes/categoryRoutes.js";
import subCategoryRoutes from "../server/routes/subCategoryRoutes.js";
import productRoutes from "../server/routes/productRoutes.js";
import wishlistRoutes from "../server/routes/wishlistRoutes.js";

dotenv.config();

const app = express();

mongoose
  .connect(envConfig.db.URL)
  .then(() => {
    console.log("Mongoose connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });

const PORT = envConfig.general.PORT || 4800;

app.get("/", (req, res) => {
  res.send("Server live");
});

app.use(cors());
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/subCategory", subCategoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
