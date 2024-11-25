import React from "react";
import product from "../../assets/product.jpg";
import productsunscreen from "../../assets/productsunscreen.jpg";
import { AiFillStar } from "react-icons/ai";

const AllProduct = () => {
  return (
    <div className="bg-gray-300 min-h-screen font-poppins">
      <div className="container mx-auto  p-4">
        {/* Breadcrumb */}
        <nav className="text-gray-500 text-sm mb-4">
          <a href="/dashboard" className="hover:text-gray-800">
            Home
          </a>
          <span className="mx-2">/</span>
          <span>Product Paket Sunscreen</span>
        </nav>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6  ">
            {/* Product 1 */}
            <div className="flex justify-center">
              <img
                src={productsunscreen}
                alt="Product"
                className="w-full h-full object-contain max-w-md rounded-lg shadow-sm"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Lorem Ipsum
              </h1>
              <p className="text-gray-700 text-sm mb-4">
                Category :{" "}
                <span className="font-medium">Product Paket Sunscreen</span>
              </p>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex space-x-1 text-yellow-500">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <span className="text-gray-600 text-sm ml-2">(50 reviews)</span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-gray-800 mb-4">
                IDR 1,500,000
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at
                sem a turpis bibendum tristique.
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <label htmlFor="quantity" className="text-gray-700 font-medium">
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

              {/* Add to Cart Button */}
              <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition">
                Add to Cart
              </button>
            </div>

            {/* Product 2 */}

            <div className="flex justify-center ">
              <img
                src={productsunscreen}
                alt="Product"
                className="w-full h-full object-contain max-w-md rounded-lg shadow-sm"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Lorem Ipsum
              </h1>
              <p className="text-gray-700 text-sm mb-4">
                Category :{" "}
                <span className="font-medium">Product Paket Sunscreen</span>
              </p>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex space-x-1 text-yellow-500">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <span className="text-gray-600 text-sm ml-2">(50 reviews)</span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-gray-800 mb-4">
                IDR 1,500,000
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at
                sem a turpis bibendum tristique.
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <label htmlFor="quantity" className="text-gray-700 font-medium">
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

              {/* Add to Cart Button */}
              <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition">
                Add to Cart
              </button>
            </div>
            <div className="flex justify-center ">
              <img
                src={productsunscreen}
                alt="Product"
                className="w-full h-full object-contain max-w-md rounded-lg shadow-sm"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Lorem Ipsum
              </h1>
              <p className="text-gray-700 text-sm mb-4">
                Category :{" "}
                <span className="font-medium">Product Paket Sunscreen</span>
              </p>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex space-x-1 text-yellow-500">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <span className="text-gray-600 text-sm ml-2">(50 reviews)</span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-gray-800 mb-4">
                IDR 1,500,000
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at
                sem a turpis bibendum tristique.
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <label htmlFor="quantity" className="text-gray-700 font-medium">
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

              {/* Add to Cart Button */}
              <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
