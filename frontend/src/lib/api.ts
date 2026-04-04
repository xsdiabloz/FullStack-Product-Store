import api from "./axios";
import type { CreateComment, SyncUserPayload } from "../types/otherTypes";
import type { CreateProduct, UpdateProduct } from "../types/productTypes";

export const syncUser = async (userData: SyncUserPayload) => {
  const { data } = await api.post("/users/sync", userData);
  return data;
};

export const getAllProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

export const getProductById = async (id: string) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const getMyProducts = async () => {
  const { data } = await api.get("/products/my");
  return data;
};

export const createProduct = async (productData: CreateProduct) => {
  const { data } = await api.post("/products", productData);
  return data;
};

export const updateProduct = async ({
  id,
  ...productData
}: { id: string } & UpdateProduct) => {
  const { data } = await api.patch(`/products/${id}`, productData);
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

export const createComment = async (commentData: CreateComment) => {
  const { data } = await api.post(
    `/comments/${commentData.productId}`,
    commentData,
  );
  return data;
};

export const deleteComment = async (id: string) => {
  const { data } = await api.delete(`/comments/${id}`);
  return data;
};
