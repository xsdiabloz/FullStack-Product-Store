import type { Request, Response } from "express";
import * as queries from "../db/queries.js";
import { getAuth } from "@clerk/express";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await queries.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.log("Failed in productController", (error as Error).message);
    return res.status(500).json({ message: "Failed to load products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await queries.getProductById(id as string);

    if (!product)
      return res.status(404).json({ message: "The Product not found" });

    res.status(200).json(product);
  } catch (error) {
    console.log(
      "Failed in productController: cannot getting product",
      (error as Error).message,
    );
    return res.status(500).json({ message: "Failed to load product" });
  }
};

export const getMyProducts = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const products = await queries.getProductsByUserId(userId);
    res.status(200).json(products);
  } catch (error) {
    console.log(
      "Failed in productController: cannot getting user products",
      (error as Error).message,
    );
    return res.status(500).json({ message: "Failed to load user products" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { title, description, imageUrl } = req.body;
    if (!title || !description || !imageUrl) {
      return res
        .status(400)
        .json({ message: "Title, description and imageUrl are required" });
    }

    const product = await queries.createProduct({
      title,
      description,
      imageUrl,
      userId,
    });
    res.status(201).json(product);
  } catch (error) {
    console.log(
      "Failed in productController: cannot create product",
      (error as Error).message,
    );
    return res.status(500).json({ message: "Failed to create product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;
    const { title, description, imageUrl } = req.body;

    const exisitngProduct = await queries.getProductById(id as string);
    if (!exisitngProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (exisitngProduct.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You can only update your own products" });
    }

    const product = await queries.updateProduct(id as string, {
      title,
      description,
      imageUrl,
    });
    res.status(200).json(product);
  } catch (error) {
    console.log(
      "Failed in productController: cannot update product",
      (error as Error).message,
    );
    return res.status(500).json({ message: "Failed to update product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;

    const exisitngProduct = await queries.getProductById(id as string);
    if (!exisitngProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (exisitngProduct.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You can only delete your own products" });
    }

    await queries.deleteProduct(id as string);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(
      "Failed in productController: cannot delete product",
      (error as Error).message,
    );
    return res.status(500).json({ message: "Failed to delete product" });
  }
};
