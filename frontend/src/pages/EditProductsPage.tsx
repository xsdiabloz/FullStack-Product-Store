import React from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useProduct, useUpdateMyProduct } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "@clerk/react";
import EditProductForm from "../components/EditProductForm";

const EditProductsPage = () => {
  const { id } = useParams();
  const { isLoaded, userId } = useAuth();

  if (!id) return;
  const { data: product, isLoading } = useProduct(id);

  const updateProduct = useUpdateMyProduct();
  const navigate = useNavigate();

  if (isLoading) return <LoadingSpinner />;

  if (!product || product.userId !== userId) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">
            {!product ? "Not found" : "Access denied"}
          </h2>
          <Link to="/" className="btn btn-primary btn-sm">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <EditProductForm
      product={product}
      isPending={updateProduct.isPending}
      isError={updateProduct.isError}
      onSubmit={(formData) => {
        updateProduct.mutate(
          { id, ...formData },
          {
            onSuccess: () => navigate(`/product/${id}`),
          },
        );
      }}
    />
  );
};

export default EditProductsPage;
