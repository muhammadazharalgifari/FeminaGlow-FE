import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3888/api/products/${id}`);
        
        const product = data.product;
        setValue("name", product.name);
        setValue("description", product.description);
        setValue("price", product.price);
        setValue("stock", product.stock);
        setPreview(`/imageProducts/${product.imageProduct}`);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch product data");
      }
    };
    fetchProduct();
  }, [id, setValue]);

  const onSubmit = async (formData) => {
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("description", formData.description);
    formDataObj.append("price", formData.price);
    formDataObj.append("stock", formData.stock);
    if (formData.imageProduct[0]) {
      formDataObj.append("imageProduct", formData.imageProduct[0]);
    }

    try {
      setLoading(true);
      await axios.put(`/api/products/${id}`, formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/products");
    } catch (err) {
      console.error(err);
      setError("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Edit Product
      </h2>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-semibold mb-2">
            Product Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: true })}
            placeholder="Enter product name"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            {...register("description", { required: true })}
            placeholder="Enter product description"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300 resize-none"
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label htmlFor="price" className="text-sm font-semibold mb-2">
            Price
          </label>
          <input
            id="price"
            type="number"
            {...register("price", { required: true })}
            placeholder="Enter product price"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="stock" className="text-sm font-semibold mb-2">
            Stock
          </label>
          <input
            id="stock"
            type="number"
            {...register("stock", { required: true })}
            placeholder="Enter product stock"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="imageProduct" className="text-sm font-semibold mb-2">
            Product Image
          </label>
          <input
            id="imageProduct"
            type="file"
            {...register("imageProduct")}
            onChange={handleImageChange}
            accept="image/jpeg, image/png, image/jpg"
            className="border border-gray-300 rounded-md p-2 focus:outline-none"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 rounded-lg w-48 h-auto mx-auto"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white font-semibold rounded-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
