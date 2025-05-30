import { useQuery } from "@tanstack/react-query";
import { Alert, Image } from "antd";
import { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../../ax";
import { useCart } from "../Cart";
import Navbar from "../../component/Navbar";
import productInCategoryImage from "../../assets/productInCategoryImage.jpg";
import Footer from "../../component/Footer";
import { FaHome } from "react-icons/fa";

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

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/categories");
      return res.data.data;
    },
  });

  const { data: currentCategory, isLoading: isCategoryLoading } = useQuery({
    queryKey: ["categoryDetail", categoryId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/category/${categoryId}`);
      return res.data.data;
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
        <div className="font-poppins">{`Produk ${product.name}" berhasil ditambahkan ke keranjang.`}</div>
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
    <div className="relative w-full font-poppins overflow-x-hidden">
      <Navbar />
      <div className="relative w-full h-[504px]">
        <img
          src={productInCategoryImage}
          alt="..."
          className="w-full h-full object-cover"
        />
        {isCategoryLoading ? (
          <div className="absolute inset-0 flex flex-col justify-end items-start text-black text-center px-20 gap-6 mb-20">
            <h1 className="text-8xl font-extralight">Loading...</h1>
            <p className="text-3xl font-extralight">Mengambil kategori...</p>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col justify-end items-start text-black  px-20 gap-6 mb-20">
            <h1 className="text-8xl font-extralight">
              {currentCategory?.name}
            </h1>
            <p className="text-3xl font-extralight max-w-3xl">
              {currentCategory?.description}
            </p>
          </div>
        )}
      </div>

      {/* Alert */}
      {alertVisible && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto">
            <Alert
              message={alertMessage}
              type="success"
              showIcon
              closable
              onClose={() => setAlertVisible(false)}
              className="shadow-lg"
            />
          </div>
        </div>
      )}

      <div className="w-full bg-white py-10 overflow-x-hidden">
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4 md:px-8 gap-6">
          <div className="flex items-center gap-4">
            <p className="text-2xl font-normal">Detail Produk</p>
            {categories?.map((cat) => (
              <Link
                key={cat.id}
                to={`/product/${cat.id}`}
                className={`px-4 py-2 rounded-full ${
                  cat.id === categoryId
                    ? "bg-white text-black font-extralight"
                    : "bg-white bg-opacity-30 hover:bg-opacity-70 font-light"
                } transition`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm font-light">
            <div className="flex items-center gap-2 bg-black rounded-full text-white px-4 py-2 cursor-pointer">
              <FaHome />
              <Link to="/dashboard">Home</Link>
            </div>
            <span className="mx-2">/</span>
            <span>
              {isLoading
                ? "Loading..."
                : data && data.length > 0
                ? data[0].name
                : "Belum Ada Produk"}
            </span>
          </nav>

          {isLoading ? (
            <p className="text-lg">Loading...</p>
          ) : (
            <div className="w-full flex items-center justify-center">
              <div className="p-4 grid grid-cols-2 md:grid-cols-2 gap-8">
                {data?.map((category) =>
                  category.products.map((product) => {
                    const isPromo = product.isPromo;
                    const displayPrice = isPromo
                      ? product.promoPrice
                      : product.price;

                    return (
                      <div
                        className="bg-[#FCE2CA] p-6 rounded-lg shadow-[10px_10px_20px_#E2B581] flex items-center gap-4 w-full max-w-xl"
                        key={product.id}
                      >
                        {/* Product Image */}
                        <Image
                          src={`http://localhost:3888/public/${product.imageProduct}`}
                          alt={product.name}
                          className="w-[123px] h-[184px] object-cover rounded-md bg-white"
                        />

                        {/* Product Info */}
                        <div className="flex flex-col gap-2 justify-between text-black w-full">
                          <h1 className="text-lg font-semibold uppercase tracking-wider mb-1">
                            {product.name}
                          </h1>
                          {/* <p className="text-sm mb-1">
                            Category: {category.name}
                          </p> */}

                          <div className="text-lg font-bold mb-2">
                            {isPromo && (
                              <span className="text-red-500 mr-2">
                                IDR {product.promoPrice.toLocaleString("id-ID")}
                              </span>
                            )}
                            {isPromo ? (
                              <span className="line-through text-black text-sm">
                                IDR {product.price.toLocaleString("id-ID")}
                              </span>
                            ) : (
                              <span className="text-black">
                                IDR {product.price.toLocaleString("id-ID")}
                              </span>
                            )}
                          </div>

                          <p className="text-sm mb-4 line-clamp-3">
                            {product.description}
                          </p>

                          {/* Quantity & Button */}
                          <div className="flex items-center gap-3 mb-2">
                            <label htmlFor="qty" className="text-sm">
                              Qty:
                            </label>
                            <input
                              type="number"
                              min={1}
                              value={quantity[product.id] || 1}
                              onChange={(e) =>
                                handleQuantityChange(e, product.id)
                              }
                              className="w-14 px-2 py-1 rounded text-black text-center"
                            />
                          </div>

                          <button
                            onClick={() => handleAddToCart(product)}
                            className="flex items-center justify-center gap-2 p-3 w-full rounded-full font-semibold text-sm bg-black text-white hover:bg-gray-800 transition duration-500"
                          >
                            <TiShoppingCart className="text-xl" />
                            Masukan Keranjang
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllProduct;
