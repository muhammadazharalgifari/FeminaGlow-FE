import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../ax";
import { Link, useParams } from "react-router-dom";

const AllProduct = () => {
  const { categoryId } = useParams();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["getProductByCategory", categoryId],
    queryFn: async () => {
      try {
        const result = await axiosInstance.get(`/api/${categoryId}/products`);
        // console.log(result.data.data);
        return result.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="bg-gray-300 min-h-screen font-poppins">
      {/* Breadcrumb */}
      <nav className="text-gray-500 text-sm pt-4 px-10">
        <Link to="/dashboard" className="hover:text-gray-800">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>
          {isLoading
            ? "Loading..."
            : data && data.length > 0
            ? data[0].name
            : "Belum Ada Produk"}
        </span>
      </nav>

      {/* Daftar Product */}
      {isLoading ? (
        <p className="text-lg">Loading...</p>
      ) : (
        <div className="container mx-auto p-4 flex flex-wrap gap-6 justify-center">
          {data?.map((category) =>
            category.products.map((product) => (
              <div
                className="bg-white p-6 rounded-lg shadow-md"
                key={product.id}
              >
                <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                  <div className="flex justify-center">
                    <img
                      src={`http://localhost:3888/public/${product.imageProduct}`}
                      alt={product.name}
                      className="w-full h-full object-contain max-w-md rounded-lg shadow-sm"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                      {product.name}
                    </h1>
                    <p className="text-gray-700 text-sm mb-4">
                      Category:{" "}
                      <span className="font-medium">{category.name}</span>
                    </p>

                    <div className="text-3xl font-bold text-gray-800 mb-4">
                      IDR {product.price.toLocaleString("id-ID")}
                    </div>

                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {product.description}
                    </p>

                    <div className="flex items-center space-x-4 mb-6">
                      <label
                        htmlFor="quantity"
                        className="text-gray-700 font-medium"
                      >
                        Quantity:
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        min="1"
                        defaultValue="1"
                        className="w-16 p-2 border rounded-lg text-center text-gray-700"
                      />
                    </div>

                    <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AllProduct;
