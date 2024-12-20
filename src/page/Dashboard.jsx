import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { IoArrowRedo } from "react-icons/io5";
import { GiShoppingCart } from "react-icons/gi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import axiosInstance from "../../ax";
import bgdashboard from "../assets/bgdashboard.jpg";
import promo from "../assets/promo.png";
import { useCart } from "./Cart";
import AOS from "aos";
import "aos/dist/aos.css";

const Dashboard = () => {
  const { cartItems, totalPrice, updateQuantity, removeFromCart } = useCart();
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    AOS.init({
      
      easing: "ease-in-out", 
      once: true, 
    });
  }, []);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllCategories"],
    queryFn: async () => {
      try {
        const result = await axiosInstance.get("/api/categories");
        console.log(result.data.data);
        return result.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <section className="w-full h-screen bg-white " id="home">
      {/* Section 1: Hero Section */}
      <div
        className="w-full h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgdashboard})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-10"></div>

        {/* Navbar */}
        <div className="h-16 flex w-full items-center px-10 fixed top-0 z-50">
          <div className="flex w-[280px] items-center">
            <h1 className="font-pacifico text-3xl">Shineskin Skincare</h1>
          </div>
          <nav className="flex justify-center font-poppins text-black gap-6 z-30 flex-grow mr-8 items-center cursor-pointer">
            <ScrollLink to="home" smooth={true} duration={500}>
              Home
            </ScrollLink>
            <ScrollLink to="product" smooth={true} duration={500}>
              Produk
            </ScrollLink>
            <ScrollLink to="about" smooth={true} duration={500}>
              Tentang Kami
            </ScrollLink>
            <ScrollLink to="promo" smooth={true} duration={500}>
              Promo
            </ScrollLink>
          </nav>

          <div className="flex gap-3 items-center">
            <div className="relative">
              <GiShoppingCart
                onClick={() => setShowPopUp(!showPopUp)}
                size={30}
                className="cursor-pointer"
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center select-none">
                  {cartItems.length}
                </span>
              )}
            </div>

            {/* Sidebar Keranjang */}
            {showPopUp && (
              <div className="fixed top-0 right-0 h-screen w-96 bg-white shadow-lg z-50 p-6 font-poppins">
                <div className="flex items-center justify-center gap-2 mb-8">
                  <GiShoppingCart size={30} />
                  <h2 className="text-xl font-semibold">Keranjang Anda</h2>
                </div>

                <button
                  onClick={() => setShowPopUp(false)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                >
                  ✕
                </button>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b pb-4 gap-4"
                  >
                    <p className="flex-shrink-0 w-1/4">{item.name}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(item.id, item.quantity - 1);
                          }
                        }}
                        className="bg-red-500 text-white px-2 rounded-lg shadow-lg"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="bg-green-500 text-white px-2 rounded-lg shadow-lg"
                      >
                        +
                      </button>
                    </div>
                    <span className="flex-shrink-0 w-1/5">
                      IDR {(item.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                    <button onClick={() => removeFromCart(item.id)}>
                      <RiDeleteBin5Line className="text-red-500 text-xl shadow-lg rounded-lg" />
                    </button>
                  </div>
                ))}
                <h3 className="text-lg font-semibold mt-4">
                  Total : IDR {totalPrice.toLocaleString("id-ID")}
                </h3>
                <button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg w-full font-semibold">
                  Check Out
                </button>
              </div>
            )}

            <AiOutlineUser size={27} className="relative cursor-pointer" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="w-full h-screen flex flex-col justify-center pl-[160px] pb-16 relative z-10 gap-6 max-w-3xl" data-aos="fade-up" data-aos-duration="1500">
          <h1
            
            className="text-black font-poppins text-7xl font-bold select-none"
          >
            Selamat Datang
          </h1>
          <h2 className="text-black text-3xl font-poppins font-light select-none">
            di Shineskin Skincare.
          </h2>
          <p className="text-black font-poppins text-lg font-extralight select-none">
            Ayo segera berbelanja, Percantik dirimu mulai dari sekarang miliki
            kulit yang lebih cerah dan bersih!
          </p>
          <ScrollLink
            to="product"
            smooth={true}
            duration={500}
            className="text-white font-poppins bg-slate-700 w-48 h-12 items-center flex justify-center rounded-lg shadow-lg font-semibold hover:bg-slate-800 transition-all duration-500 cursor-pointer"
          >
            Belanja Sekarang
          </ScrollLink>
        </div>
      </div>
      {/* Section 2: Kategori Produk */}
      <section
        id="product"
        className="w-full py-16 bg-gray-300 bg-cover bg-center relative bg-[url('/src/assets/bg.jpg')]"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-10 z-10"></div>

        <div className="container mx-auto px-10 text-center relative z-20">
          <h2 className="text-3xl mb-6 font-pacifico">Kategori Produk</h2>
          <p className="text-lg mb-10 font-poppins tracking-wider">
            Temukan produk-produk terbaik kami untuk perawatan kulit Anda!
          </p>

          {isLoading ? (
            <p className="text-lg">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-36 font-poppins select-none">
              {data.map((category) => (
                <div
                  className="bg-white p-6 shadow-md rounded-lg min-h-[28rem] flex flex-col justify-between" data-aos="zoom-in" data-aos-duration="1000"
                  key={category.id}
                >
                  <h3 className="text-lg font-semibold mb-6 tracking-widest uppercase">
                    {category.name}
                  </h3>
                  <div className="flex items-center justify-center">
                    <img
                      src={`http://localhost:3888/public/${category.imageCategory}`}
                      alt="..."
                      className="w-full h-60 object-contain rounded-lg"
                    />
                  </div>
                  <p className="text-gray-700 text-justify text-sm min-h-[4rem] pt-6 line-clamp-3">
                    {category.description}
                  </p>

                  <Link
                    to={`/product/${category.id}`}
                    className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition-all duration-500 text-white rounded-lg mt-4 h-12 shadow-lg gap-2 font-semibold"
                  >
                    <IoArrowRedo className="text-xl" />
                    Lihat Produk
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      ;{/* Section 3: About Us */}
      <section
        id="about"
        className="w-full -mt-6 h-screen bg-cover bg-center relative bg-[url('/src/assets/bg3.jpg')]"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-20"></div>

        <div className="w-full h-screen flex flex-col pl-[180px] pt-16 relative z-10 gap-6">
          <div className="max-w-lg bg-white p-8 rounded-lg shadow-lg" data-aos="fade-up" data-aos-duration="1500">
            <h1 className="font-pacifico font-light text-3xl">Tentang Kami</h1>
            <p className="font-poppins pt-6 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
              suscipit quae itaque possimus, ut quia dolor modi quod aliquam.
              Vero maxime laudantium dolores voluptatem error odio, recusandae
              quo perspiciatis rem sed, assumenda eaque illo commodi impedit
              perferendis velit, facere quam!
            </p>
          </div>
          <div className="max-w-lg bg-white rounded-lg shadow-lg p-8" data-aos="fade-up" data-aos-duration="1500">
            <h1 className="text-3xl font-pacifico font-light pb-6">
              Kontak Kami
            </h1>
            <div className="gap-4 flex flex-col">
              <div className="flex items-center">
                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-lg shadow-lg">
                  <AiOutlineInstagram size={25} className="fill-pink-400" />
                </div>
                <h1 className="pl-4 font-poppins">Shineskin Skincare</h1>
              </div>
              <div className="flex items-center">
                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-lg shadow-lg">
                  <AiOutlineWhatsApp size={25} className="fill-green-500" />
                </div>
                <h1 className="pl-4 font-poppins">081356782980</h1>
              </div>
              <div className="flex items-center">
                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-lg shadow-lg">
                  <AiOutlineMail size={25} className="fill-red-500" />
                </div>
                <h1 className="pl-4 font-poppins">
                  ShineskinSkincare@gmail.com
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section 4: Promo */}
      <section
        id="promo"
        className="w-full h-screen flex bg-[url('/src/assets/bg.jpg')] bg-cover bg-center relative"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-10"></div>

        <div className="w-full h-screen flex pl-[180px] pt-16 relative z-10 gap-4">
          <div className="w-1/2 h-full flex">
            <img
              src={promo}
              alt="Promo Image"
              className="w-full h-full object-cover object-bottom"
            />
          </div>
          <div className="w-1/2 h-full flex justify-center p-20">
            <div className="flex flex-col justify-center">
              <h1 className=" blink text-9xl font-bold font-poppins items-center justify-center flex flex-col ">
                BIG SALE
                
                <h1 className=" blink2 text-white">BIG SALE</h1>
              </h1>
              <p className="mt-4 text-gray-700 font-poppins text-justify">
                Tampil Cantik dan Bersinar di Bulan Ini! Promo Khusus Diskon
                Produk Perawatan Kulit hingga 50%
              </p>
              <div className="flex justify-center">
              <button
                onClick={() => scrollToSection("product")}
                className=" z-10text-black font-poppins border hover:bg-amber-300 border-black bg-amber-200 w-44 h-12 items-center flex justify-center rounded-xl font-semibold shadow-2xl mt-8"
              >
                Belanja Sekarang
              </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <section
        id="footer"
        className="w-full h-[30px] bg-white text-black flex justify-center items-center"
      >
        <h1 className="font-poppins">Copyright © 2025 Shineskin Skincare</h1>
      </section>
    </section>
  );
};

export default Dashboard;
