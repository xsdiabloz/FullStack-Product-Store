import React from "react";
import { FileTextIcon, ImageIcon, TypeIcon } from "lucide-react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { IFormData } from "../pages/CreatePage";
import type { Product, ProductBase } from "../types/productTypes";

interface FormProps {
  formData: IFormData;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
  createProduct: UseMutationResult<Product, Error, ProductBase>;
}

const CreatePageForm = ({
  formData,
  setFormData,
  createProduct,
}: FormProps) => {
  return (
    <>
      <label className="input input-bordered flex items-center gap-2 bg-base-200">
        <TypeIcon className="size-4 text-base-content/50" />
        <input
          type="text"
          placeholder="Product title"
          className="grow"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          required
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 bg-base-200">
        <ImageIcon className="size-4 text-base-content/50" />
        <input
          type="url"
          placeholder="Image URL"
          className="grow"
          value={formData.imageUrl}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))
          }
          required
        />
      </label>
      {formData.imageUrl && (
        <div className="rounded-box overflow-hidden">
          <img
            src={formData.imageUrl}
            alt="Preview"
            className="w-full h-40 object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}
      <div className="form-control">
        <div className="flex items-start gap-2 p-3 rounded-box bg-base-200 border border-base-300">
          <FileTextIcon className="size-4 text-base-content/50 mt-1" />
          <textarea
            placeholder="Description"
            className="grow bg-transparent resize-none focus:outline-none min-h-24"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            required
          />
        </div>
      </div>
      {createProduct.isError && (
        <div role="alert" className="alert alert-error alert-sm">
          <span>Failed to create. Try again.</span>
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={createProduct.isPending}
      >
        {createProduct.isPending ? (
          <span className="loading loading-spinner" />
        ) : (
          "Create Product"
        )}
      </button>
    </>
  );
};

export default CreatePageForm;
