import express from "express";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import { ENV } from "./config/env.js";

const app = express();
app.use(clerkMiddleware());
app.use(express.json());
app.use(
  cors({
    origin:
      ENV.FRONTEND_URL || "http://localhost:5173" || "http://localhost:5174",
  }),
);

const start = async () => {
  app.listen(ENV.PORT, () => {
    console.log(`server started at PORT: ${ENV.PORT}`);
  });
};

start();
