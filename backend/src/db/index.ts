import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.js";
import { ENV } from "../config/env.js";
import { Pool } from "pg";

if (!ENV.DB_URL) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

const pool = new Pool({ connectionString: ENV.DB_URL });

pool.on("connect", () => {
  console.log("Database connected successfully");
});

pool.on("error", () => {
  console.log("Database connection error");
});

export const db = drizzle({ client: pool, schema });
