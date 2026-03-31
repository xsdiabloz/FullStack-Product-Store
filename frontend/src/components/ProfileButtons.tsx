import React from "react";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import type { Product } from "../types/productTypes";
import type { NavigateFunction } from "react-router";
import type { UseMutationResult } from "@tanstack/react-query";

interface ProfileButtonsProps {
  navigate: NavigateFunction;
  handleDelete: (id: string) => void;
  product: Product;
  deleteProduct: UseMutationResult<any, Error, string, unknown>;
}

const ProfileButtons = ({
  navigate,
  handleDelete,
  product,
  deleteProduct,
}: ProfileButtonsProps) => {
  return (
    <div className="card-actions justify-end mt-2">
      <button
        onClick={() => navigate(`/product/${product.id}`)}
        className="btn btn-ghost btn-xs gap-1"
      >
        <EyeIcon className="size-3" /> View
      </button>
      <button
        onClick={() => navigate(`/edit/${product.id}`)}
        className="btn btn-ghost btn-xs gap-1"
      >
        <EditIcon className="size-3" /> Edit
      </button>
      <button
        onClick={() => handleDelete(product.id)}
        className="btn btn-ghost btn-xs text-error gap-1"
        disabled={deleteProduct.isPending}
      >
        <Trash2Icon className="size-3" /> Delete
      </button>
    </div>
  );
};

export default ProfileButtons;
