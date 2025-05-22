import { useQuery } from "@tanstack/react-query";
import { Alert } from "antd";
import { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../../ax";
import { useCart } from "../Cart";

const AllProduct = () => {
  const { categoryId } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState({});
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Fetch data produk berdasarkan kategori
  const { data, isLoading } = useQuery({
    queryKey: ["getProductByCategory", categoryId],
    queryFn: async () => {
      try {
        const result = await axiosInstance.get(`/api/${categoryId}/products`);
        return result.data.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  });

  // Fungsi untuk mengatur jumlah produk
  const handleQuantityChange = (e, productId) => {
    const value = e.target.value;
    if (value >= 1) {
      setQuantity((prev) => ({
        ...prev,
        [productId]: parseInt(value),
      }));
    }
  };

  const handleAddToCart = async (product) => {
    const qty = quantity[product.id] || 1;

    try {
      await addToCart(product.id, qty);
      setAlertMessage(
        `Produk "${product.name}" berhasil ditambahkan ke keranjang.`
      );
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setAlertMessage("Gagal menambahkan produk ke keranjang.");
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
    }
  };

  return (
    <div className="bg-gray-300 min-h-screen font-poppins bg-cover bg-[url('/src/assets/bg.jpg')]">
      {/* Breadcrumb */}
      <nav className="text-sm pt-4 px-10">
        <Link to="/dashboard" className="hover:text-gray-600">
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

      <div className="py-6 text-center">
        <h1 className="font-pacifico text-3xl mb-4">Produk Kami</h1>
        <p className="font-poppins text-lg tracking-wider">
          Pilih produk yang anda inginkan dan tambahkan ke keranjang
        </p>
      </div>

      {/* Alert */}
      {alertVisible && (
        <Alert
          message={alertMessage}
          type="success"
          showIcon
          closable
          className="absolute right-4 z-50 top-4"
        />
      )}

      {isLoading ? (
        <p className="text-lg">Loading...</p>
      ) : (
        <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {data?.map((category) =>
            category.products.map((product) => {
              const isPromo = product.isPromo;
              const displayPrice = isPromo ? product.promoPrice : product.price;

              return (
                <div
                  className="bg-white p-6 rounded-lg shadow-md flex justify-center items-center"
                  key={product.id}
                >
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex justify-center">
                      <img
                        src={`http://localhost:3888/public/${product.imageProduct}`}
                        alt={product.name}
                        className="w-full h-72 object-contain rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <h1 className="text-xl font-semibold tracking-widest uppercase mb-4">
                        {product.name}
                      </h1>

                      <p className="text-gray-700 text-sm mb-4">
                        Category :{" "}
                        <span className="font-semibold">{category.name}</span>
                      </p>

                      <div className="text-xl font-bold mb-4">
                        {isPromo && (
                          <span className="text-red-500 mr-2">
                            IDR {product.promoPrice.toLocaleString("id-ID")}
                          </span>
                        )}
                        {isPromo ? (
                          <span className="line-through text-gray-500 text-sm">
                            IDR {product.price.toLocaleString("id-ID")}
                          </span>
                        ) : (
                          <span>
                            IDR {product.price.toLocaleString("id-ID")}
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 mb-6 text-sm min-h-[4rem]">
                        {product.description}
                      </p>

                      <div className="flex items-center space-x-4 mb-4">
                        <label htmlFor="quantity" className="font-semibold">
                          Qty :
                        </label>
                        <input
                          type="number"
                          value={quantity[product.id] || 1}
                          onChange={(e) => handleQuantityChange(e, product.id)}
                          className="w-20 p-2 border rounded-lg shadow-lg text-center text-gray-700"
                        />
                      </div>

                      <button
                        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 cursor-pointer"
                        onClick={() => handleAddToCart(product)}
                      >
                        <TiShoppingCart className="text-2xl" />
                        <p>Add to Cart</p>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default AllProduct;
