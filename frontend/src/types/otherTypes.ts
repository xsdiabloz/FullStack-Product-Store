export type User = {
  id: string;
  email: string;
  name?: string | null;
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type SyncUserPayload = {
  id: string;
  email: string;
  name?: string;
  imageUrl?: string;
};

export type ProductComment = {
  id: string;
  content: string;
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateComment = {
  content: string;
  userId: string;
  productId: string;
};

export type CommentFull = ProductComment & {
  user: User;
};
