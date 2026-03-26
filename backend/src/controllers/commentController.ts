import type { Request, Response } from "express";
import * as queries from "../db/queries.js";
import { getAuth } from "@clerk/express";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    const { productId } = req.params;
    const { content } = req.body;

    if (!userId || !productId || !content) {
      return res.status(400).json({
        message: !userId ? "Unauthorized" : "Missing content or productId",
      });
    }

    const product = await queries.getProductById(productId as string);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const comment = await queries.createComment({
      content,
      userId,
      productId: productId as string,
    });
    res.status(201).json(comment);
  } catch (error) {
    console.log(
      "Error in commentController: cannot create a comment",
      (error as Error).message,
    );
    return res.status(500).json({ message: "Failed to create comment" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    const { commentId } = req.params;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const existingComment = await queries.getCommentById(commentId as string);
    if (!existingComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (existingComment.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You can only delete your own comments" });
    }

    await queries.deleteComment(commentId as string);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log(
      "Error in commentController: cannot delete the comment",
      (error as Error).message,
    );
    return res.status(500).json({ message: "Failed to delete the comment" });
  }
};
