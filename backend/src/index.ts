import express from "express";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import { ENV } from "./config/env.js";
import userRoutes from "./router/userRoutes.js";
import productRoutes from "./router/productRoutes.js";
import commentRoutes from "./router/commentRoutes.js";

const app = express();
app.use(clerkMiddleware());
app.use(express.json());
app.use(
  cors({
    origin:
      ENV.FRONTEND_URL || "http://localhost:5173" || "http://localhost:5174",
  }),
);

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

const start = async () => {
  app.listen(ENV.PORT, () => {
    console.log(`server started at PORT: ${ENV.PORT}`);
  });
};

start();
