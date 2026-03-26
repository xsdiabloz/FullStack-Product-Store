import type { Request, Response } from "express";
import * as queries from "../db/queries.js";
import { getAuth } from "@clerk/express";

export const syncUser = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { email, imageUrl, name } = req.body;
    if (!email || !name || !imageUrl) {
      return res
        .status(400)
        .json({ message: "Email, name and imageUrl are required" });
    }
    const user = await queries.upsertUser({
      id: userId,
      name,
      email,
      imageUrl,
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log("Failed in userController", (error as Error).message);
    return res.status(500).json({ message: "Failed to sync" });
  }
};
