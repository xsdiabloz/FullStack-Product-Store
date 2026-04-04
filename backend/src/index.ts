import express from "express";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { ENV } from "./config/env.js";
import userRoutes from "./router/userRoutes.js";
import productRoutes from "./router/productRoutes.js";
import commentRoutes from "./router/commentRoutes.js";

const app = express();
app.use(clerkMiddleware());
app.use(express.json());
app.use(
  cors({
    origin: ENV.FRONTEND_URL ?? "http://localhost:5174",
    credentials: true,
  }),
);

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(__dirname, "../../");
const frontendPath = path.join(rootPath, "frontend", "dist");

console.log("Checking frontend path:", frontendPath);

app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"), (err) => {
    if (err) {
      console.error("Error sending index.html:", err);
      res
        .status(404)
        .send("Frontend build not found. Looked in: " + frontendPath);
    }
  });
});

const start = async () => {
  app.listen(ENV.PORT, () => {
    console.log(`server started at PORT: ${ENV.PORT}`);
  });
};

start();
