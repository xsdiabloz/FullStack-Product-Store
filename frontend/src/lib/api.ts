import api from "./axios";

export type SyncUserPayload = {
  id: string;
  email: string;
  name?: string;
  imageUrl?: string;
};

type ProductPayload = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  userId: string;
};

type CommentPayload = {
  id: string;
  content: string;
  userId: string;
  productId: string;
};

export const syncUser = async (userData: SyncUserPayload) => {
  const { data } = await api.post("/users/sync", userData);
  return data;
};

export const getAllProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

export const getProductsById = async (id: string) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const getMyProducts = async () => {
  const { data } = await api.get("/products/my");
  return data;
};

export const createProduct = async (productData: ProductPayload) => {
  const { data } = await api.post("/products", productData);
  return data;
};

export const updateProduct = async (
  id: string,
  productData: Partial<ProductPayload>,
) => {
  const { data } = await api.patch(`/products/${id}`, productData);
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

export const createComment = async (commentData: CommentPayload) => {
  const { data } = await api.post("/comments", commentData);
  return data;
};

export const deleteComment = async (id: string) => {
  const { data } = await api.delete(`/comments/${id}`);
  return data;
};
