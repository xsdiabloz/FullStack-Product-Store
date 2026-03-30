import type { User } from "./otherTypes";

export type ProductBase = {
  title: string;
  description: string;
  imageUrl: string;
  userId: string;
};

export type CreateProduct = ProductBase;

export type UpdateProduct = Partial<ProductBase>;

export type Product = ProductBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductFull = Product & {
  user: User;
  comments: Comment[];
};
