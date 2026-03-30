import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, getAllProducts } from "../lib/api";
import type { ProductFull } from "../types/productTypes";

export const useProducts = () => {
  const result = useQuery<ProductFull[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  return result;
};

export const useCreateProduct = () => {
  const result = useMutation({ mutationFn: createProduct });
  return result;
};
