import { useQuery } from "@tanstack/react-query";
import { Modal } from "antd";
import { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axiosInstance from "../../../ax";
import { useCart } from "../Cart";

const ProductPromo = () => {
  const { addToCart, refetchCart } = useCart();
  const [addingItemId, setAddingItemId] = useState(null);

  const { data: promoProducts = [], isLoading } = useQuery({
    queryKey: ["promoProducts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/promo/products");
      return res.data.data;
    },
  });

  const handleAddToCart = async (product) => {
    setAddingItemId(product);
    try {
      await addToCart(product.id, 1, product.promoPrice);
      Modal.success({
        title: "Berhasil Ditambahkan",
        content: "Produk berhasil ditambahkan ke keranjang",
      });
      refetchCart();
    } catch (error) {
      Modal.error({
        title: "Gagal Ditambahkan",
        content:
          error.response?.data?.message ||
          "Produk gagal ditambahkan ke keranjang",
      });
    } finally {
      setAddingItemId(null);
    }
  };

  return (
    <section
      id="promo"
      className="w-full h-screen bg-cover bg-center relative flex flex-col bg-[url('/src/assets/bg.jpg')] py-16"
      // className="bg-gray-50 py-10"
    >
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="container mx-auto px-10 text-center relative z-20">
        <h2 className="blink text-9xl font-bold text-gray-800 font-poppins">
          BIG SALE
        </h2>
        <p className="mt-2 text-lg mb-10 font-poppins tracking-wider">
          Tampil cantik dan berseri bulan ini! Promo Spesial Diskon Produk
          Perawatan Kulit Hingga 50%
        </p>
      </div>

      <div className="relative p-6">
        <div className="swiper-button-prev text-white bg-slate-500 hover:bg-gray-300 rounded-full p-6 shadow-md absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer"></div>
        <div className="swiper-button-next text-white bg-slate-500 hover:bg-gray-300 rounded-full p-6 shadow-md absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer"></div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={"auto"}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            320: { slidesPerView: 1.2 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {promoProducts.map((product) => (
            <SwiperSlide key={product.id} className="h-auto">
              <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center font-poppins">
                <img
                  src={`http://localhost:3888/public/${product.imageProduct}`}
                  alt={product.name}
                  className="w-full h-48 object-contain mb-3"
                />
                <h2 className="font-semibold text-sm text-center line-clamp-2">
                  {product.name}
                </h2>
                <div className="text-red-600 text-sm flex flex-col items-center mt-2">
                  <span className="line-through text-gray-400 text-base block">
                    Rp {product.price.toLocaleString("id-ID")}
                  </span>
                  <span className="font-bold text-lg">
                    Rp {product.promoPrice.toLocaleString("id-ID")}
                  </span>
                </div>
                <button
                  className="mt-3 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                  onClick={() => handleAddToCart(product)}
                  disabled={addingItemId === product.id}
                >
                  {addingItemId === product.id ? (
                    "Menambahkan..."
                  ) : (
                    <div className="flex items-center gap-2">
                      <TiShoppingCart className="text-2xl" />
                      <span>Add to Cart</span>
                    </div>
                  )}
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductPromo;
