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
      className="w-full h-screen font-poppins flex flex-col bg-white pt-24"
    >
      <div className="flex flex-col items-center justify-center gap-6 mb-6">
        <h1 className="text-5xl font-extralight">Promo Produk</h1>
        <p className="text-base font-extralight tracking-wider">
          Dapatkan promo di setiap harinya untuk mendapatkan produk dengan harga
          murah
        </p>
      </div>

      <div className="relative p-6">
        <div className="swiper-button-prev text-white bg-black hover:bg-gray-300 rounded-full p-6 shadow-md absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer"></div>
        <div className="swiper-button-next text-white bg-black hover:bg-gray-300 rounded-full p-6 shadow-md absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer"></div>

        {/* <Swiper
          modules={[Navigation]}
          slidesPerView={"auto"}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            320: { slidesPerView: 1.2 },
            480: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {promoProducts.map((product) => (
            <SwiperSlide
              key={product.id}
              className="flex flex-col items-center justify-center"
            >
              <div className="bg-[#FCE2CA] rounded-2xl shadow hover:shadow-lg transition-all duration-300 font-poppins mb-3">
                <img
                  src={`http://localhost:3888/public/${product.imageProduct}`}
                  alt={product.name}
                  className="w-[252px] h-[378px] object-contain"
                />
              </div>
              <h2 className="font-normal text-base text-center line-clamp-2">
                {product.name}
              </h2>
              <div className="text-black text-sm flex flex-col items-center mt-2 font-medium">
                <span className="line-through text-[#F5BC95] text-lg block">
                  Rp {product.price.toLocaleString("id-ID")}
                </span>
                <span className="text-xl">
                  Rp {product.promoPrice.toLocaleString("id-ID")}
                </span>
              </div>
              <button
                className="mt-3 bg-[#FCE2CA] hover:bg-[#F5BC95] w-[222px] h-[41px] rounded-full text-sm font-semibold transition-all duration-500 text-black"
                onClick={() => handleAddToCart(product)}
                disabled={addingItemId === product.id}
              >
                {addingItemId === product.id ? (
                  "Menambahkan..."
                ) : (
                  <div className="flex items-center gap-2 justify-center">
                    <TiShoppingCart className="text-2xl" />
                    <span>Masukan Keranjang</span>
                  </div>
                )}
              </button>
            </SwiperSlide>
          ))}
        </Swiper> */}

        {!isLoading && promoProducts.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center mt-20">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-6 rounded-md shadow-md w-full max-w-xl text-center">
              <h2 className="text-xl font-semibold mb-2">
                Tidak Ada Promo Saat Ini
              </h2>
              <p className="text-sm">
                Produk dengan harga promo akan muncul di sini jika tersedia.
              </p>
            </div>
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            slidesPerView={"auto"}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              320: { slidesPerView: 1.2 },
              480: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {promoProducts.map((product) => (
              <SwiperSlide
                key={product.id}
                className="flex flex-col items-center justify-center"
              >
                {/* Card produk */}
                <div className="bg-[#FCE2CA] rounded-2xl shadow hover:shadow-lg transition-all duration-300 font-poppins mb-3">
                  <img
                    src={`http://localhost:3888/public/${product.imageProduct}`}
                    alt={product.name}
                    className="w-[252px] h-[378px] object-contain"
                  />
                </div>
                <h2 className="font-normal text-base text-center line-clamp-2">
                  {product.name}
                </h2>
                <div className="text-black text-sm flex flex-col items-center mt-2 font-medium">
                  <span className="line-through text-[#F5BC95] text-lg block">
                    Rp {product.price.toLocaleString("id-ID")}
                  </span>
                  <span className="text-xl">
                    Rp {product.promoPrice.toLocaleString("id-ID")}
                  </span>
                </div>
                <button
                  className="mt-3 bg-[#FCE2CA] hover:bg-[#F5BC95] w-[222px] h-[41px] rounded-full text-sm font-semibold transition-all duration-500 text-black"
                  onClick={() => handleAddToCart(product)}
                  disabled={addingItemId === product.id}
                >
                  {addingItemId === product.id ? (
                    "Menambahkan..."
                  ) : (
                    <div className="flex items-center gap-2 justify-center">
                      <TiShoppingCart className="text-2xl" />
                      <span>Masukan Keranjang</span>
                    </div>
                  )}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default ProductPromo;
