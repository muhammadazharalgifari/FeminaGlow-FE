import React, { useEffect, useState } from "react";
import bgdashboard from "../assets/bgdashboard.jpg";
import p2 from "../assets/p2.png";
import itemdas from "../assets/itemdas.png";
import { Carousel } from "antd";
import { BsBasket2Fill, BsFillPersonFill } from "react-icons/bs";
import {
  AiFillInstagram,
  AiOutlineMail,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../ax";

const Dashboard = () => {
  // Scroll To Section Button
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [email, setEmail] = useState("");
  // Ambil Email Pengguna Dari Local Storage
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  });

  // Pop Up Profile
  const [showProfile,setShowProfile]=useState(false);
  const handleProfile =()=>{
    setShowProfile(!showProfile);
  }

  // Pop Up Keranjang
  const [showPopUp, setShowPopUp] = useState(false);
  const handlePopUp = () => {
    setShowPopUp(!showPopUp);
  };

  // Data Dumy
  // const cartItems = [
  //   { id: 1, name: "Paket Sunscreen", price: 100000 },
  //   { id: 2, name: "Paket Body Scrub", price: 150000 },
  //   { id: 3, name: "Paket Lengkap", price: 200000 },
  // ];

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
    <section className="w-full h-screen bg-white">
      {/* Section 1: Hero Section */}
      <div
        className="w-full h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgdashboard})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-20"></div>

        {/* Navbar */}
        <div className="h-16 flex w-full items-center px-10 ">
          <div className="flex w-[280px] items-center">
            <h1 className="font-pacifico text-3xl">Shineskin Skincare</h1>
          </div>
          <nav className="flex justify-center font-poppins  text-black gap-6 z-30 flex-grow mr-8 items-center">
            <a href="#home" className="hover:underline cursor-pointer">
              Home
            </a>
            <a
              onClick={() => scrollToSection("about")}
              className="hover:underline cursor-pointer"
            >
              About
            </a>
            <a
              onClick={() => scrollToSection("promo")}
              className="hover:underline cursor-pointer"
            >
              Promo
            </a>
            <a
              onClick={() => scrollToSection("product")}
              className="hover:underline cursor-pointer"
            >
              Product
            </a>
          </nav>
          <div className="flex w-[220px] justify-end items-center z-10 gap-2">
            {/* nontifikasi jumlah produk */}
            {/* {cartItems.length > 0 && (
              <span className="absolute top-[5px] right-[3%] bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )} */}
            {/* pup up button keranjang */}
            {/* {!showPopUp && (
              <BsBasket2Fill
                onClick={handlePopUp}
                size={23}
                className="cursor-pointer"
              />
            )} */}
            <h1>{email}</h1>
            <BsFillPersonFill  onClick={handleProfile} size={25} className="cursor-pointer" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="w-full h-screen flex flex-col justify-center pl-[180px] pb-16 relative z-10 gap-4">
          <h2 className="text-black text-4xl font-poppins font-semibold">
            Selamat Datang Di Shineskin Skincare
          </h2>
          <h1 className="text-black font-poppins text-2xl">
            Ayo Percantik Dirimu Mulai Dari Sekarang Juga
          </h1>
          <button
            onClick={() => scrollToSection("product")}
            className="text-black font-poppins bg-amber-200 w-44 h-12 items-center flex justify-center rounded-xl font-semibold shadow-2xl hover:bg-amber-300"
          >
            Belanja Sekarang
          </button>
        </div>

        {/*   Pop Up Keranjang */}
        {/* {showPopUp && (
          <div className="fixed top-0 right-0 w-80 h-screen bg-white shadow-lg z-50 p-4">
            <h2 className="text-xl font-bold mb-4">Keranjang Anda</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <p>{item.name}</p>
                  <span>Rp {item.price.toLocaleString("id-ID")}</span>
                </div>
              ))}
            </div>
            <button
              onClick={handlePopUp}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Tutup
            </button>
            <button className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-lg w-full">
              Check Out
            </button>
          </div>
        )} */}
      </div>
      {/* Section 2: Kategori Produk */}
      <section
        id="product"
        className="w-full h-screen py-20 bg-gray-300 bg-cover bg-center relative bg-[url('/src/assets/bg.jpg')]"
      >
        <div className="absolute inset-0 bg-black opacity-20 "></div>
        <div className="container mx-auto px-10 text-center relative z-10">
          <h2 className="text-3xl font-semibold mb-6 font-poppins">
            Kategori Produk
          </h2>
          <p className="text-lg mb-10 font-poppins">
            Temukan produk-produk terbaik kami untuk perawatan kulit Anda!
          </p>
          {isLoading ? (
            <p className="text-lg">Loading...</p>
          ) : (
            <Carousel
              dots
              arrows
              slidesToShow={4}
              slidesToScroll={4}
              responsive={[
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                  },
                },
              ]}
            >
              {data.map((category) => (
                <div className="p-4" key={category.id}>
                  <div className="bg-white p-6 shadow-md rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">
                      {category.name}
                    </h3>
                    <div className="flex items-center justify-center">
                      <img
                        src={p2}
                        alt="Paket Sunscreen"
                        className="max-w-[110%] max-h-[100%] object-contain"
                      />
                    </div>
                    <p className="text-gray-700 text-justify">
                      Perlindungan kulit optimal dari sinar matahari dengan
                      paket sunscreen ini!
                    </p>
                    <Link
                      to={`/product/${category.id}`}
                      className="flex items-center justify-center font-poppins bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 h-12"
                    >
                      Lihat Produk
                    </Link>
                  </div>
                </div>
              ))}
            </Carousel>
          )}
        </div>
      </section>
      ;{/* Section 3: About Us */}
      <section
        id="about"
        className="w-full -mt-10 h-screen bg-cover bg-center relative bg-[url('/src/assets/bg3.jpg')]"
      >
        <div className="absolute inset-0 bg-black opacity-25"></div>
        <div className="w-full h-screen flex flex-col pl-[180px] pt-16 relative z-10 gap-4">
          <div className="w-[500px]">
            <h1 className="font-poppins font-semibold text-4xl">About Us</h1>
            <p className="font-poppins pt-6 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              voluptatem ipsa itaque repellendus voluptate qui aliquid animi eos
              sit. Nisi minus, esse et minima dicta vero quaerat ut velit porro.
            </p>
          </div>
          <div className="pt-14 w-[500px]">
            <h1 className="text-4xl font-poppins font-semibold pb-6">
              Contact Us
            </h1>
            <div className="gap-4 flex flex-col">
              <div className="flex items-center">
                <div className="bg-amber-200 border border-black w-[40px] h-[40px] flex items-center justify-center rounded-lg">
                  <AiFillInstagram size={25} />
                </div>
                <h1 className="pl-4 font-poppins">Shineskin Skincare</h1>
              </div>
              <div className="flex items-center">
                <div className="bg-amber-200 border border-black w-[40px] h-[40px] flex items-center justify-center rounded-lg">
                  <AiOutlineWhatsApp size={25} />
                </div>
                <h1 className="pl-4 font-poppins">081356782980</h1>
              </div>
              <div className="flex items-center">
                <div className="bg-amber-200 border border-black w-[40px] h-[40px] flex items-center justify-center rounded-lg">
                  <AiOutlineMail size={25} />
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
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="w-full h-screen flex pl-[180px] pt-16 relative z-10 gap-4">
          <div className="w-1/2 h-full flex">
            <img
              src={itemdas}
              alt="Promo Image"
              className="w-full h-full object-cover object-bottom"
            />
          </div>
          <div className="w-1/2 h-full flex justify-center p-20">
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold font-poppins bg-amber-200 items-center justify-center flex w-[500px] h-[70px] shadow-xl">
                Promo Bulan Ini
              </h1>
              <p className="mt-4 text-gray-700 font-poppins text-justify">
                Tampil Cantik dan Bersinar di Bulan Ini! Promo Khusus Diskon
                Produk Perawatan Kulit hingga 50%
              </p>
              <button
                onClick={() => scrollToSection("product")}
                className=" z-10text-black font-poppins border hover:bg-amber-300 border-black bg-amber-200 w-44 h-12 items-center flex justify-center rounded-xl font-semibold shadow-2xl mt-8"
              >
                Belanja Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <section
        id="footer"
        className="w-full h-[30px] bg-black flex justify-center items-center"
      >
        <h1 className="text-white">Copyright © 2025 Shineskin Skincare</h1>
      </section>
    </section>
  );
};

export default Dashboard;
