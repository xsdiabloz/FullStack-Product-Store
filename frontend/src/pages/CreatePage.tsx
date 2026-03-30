import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCreateProduct } from "../hooks/useProducts";
import { ArrowLeftIcon, SparkleIcon } from "lucide-react";
import CreatePageForm from "../components/CreatePageForm";
import { useUser } from "@clerk/react";

export interface IFormData {
  title: string;
  description: string;
  imageUrl: string;
}

const CreatePage = () => {
  const { user } = useUser();

  const navigate = useNavigate();
  const createProduct = useCreateProduct();
  const [formData, setFormData] = useState<IFormData>({
    title: "",
    description: "",
    imageUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    createProduct.mutate(
      { ...formData, userId: user.id },
      {
        onSuccess: () => navigate("/"),
        onError: (err) => console.log("Error while creating", err),
      },
    );
  };

  return (
    <div className="max-w-lg mx-auto">
      <Link to="/" className="btn btn-ghost btn-sm gap-1 mb-4">
        <ArrowLeftIcon className="size-4" />
        Back
      </Link>
      <div className="card bg-base-300">
        <div className="card-body">
          <h1 className="card-title">
            <SparkleIcon className="size-5 text-primary" />
            New Product
          </h1>
          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <CreatePageForm
              formData={formData}
              setFormData={setFormData}
              createProduct={createProduct}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
